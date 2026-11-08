#!/usr/bin/env python3
"""Reject SDKs and resolved dependencies affected by GHSA-frr6-h895-5pxp."""
# https://firebase.google.com/support/guides/compromised-emudhra-intermediate-ca
# https://github.com/dart-lang/sdk/security/advisories/GHSA-frr6-h895-5pxp
import argparse
import json
from pathlib import Path
import re
import subprocess


def version(value):
    if not re.fullmatch(r"\d+\.\d+\.\d+", value):
        raise ValueError(f"Expected a stable version, got {value!r}")
    return tuple(map(int, value.split(".")))


def locked_package(text, name):
    match = re.search(rf"^  {name}:\n(?:(?:    .*|)\n)*?    version: \"([^\"]+)\"$", text, re.M)
    if not match:
        raise ValueError(f"Missing resolved package: {name}")
    return version(match[1])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("app", nargs="?", default=".")
    args = parser.parse_args()
    app = Path(args.app)
    sdk = json.loads(subprocess.check_output(["flutter", "--version", "--machine"], text=True))
    pinned = json.loads((app / ".fvmrc").read_text())["flutter"]
    if sdk["frameworkVersion"] != pinned or version(pinned) < (3, 47, 8):
        raise ValueError("Flutter must match .fvmrc and be at least 3.47.8")
    if version(sdk["dartSdkVersion"].split()[0]) < (3, 13, 7):
        raise ValueError("Dart must be at least 3.13.7")
    lock = (app / "pubspec.lock").read_text()
    firestore = locked_package(lock, "cloud_firestore")
    if firestore not in {(6, 10, 1), (6, 10, 2)} and firestore < (7, 1, 0):
        raise ValueError("cloud_firestore does not contain the eMudhra fix")
    pods = (app / "ios/Podfile.lock").read_text()
    for name in ("FirebaseFirestore", "FirebaseFirestoreInternal"):
        match = re.search(rf"^  - {name} \(([^)]+)\):", pods, re.M)
        if not match:
            raise ValueError(f"Missing resolved pod: {name}")
        native = version(match[1])
        if native != (12, 19, 3) and native < (13, 1, 1):
            raise ValueError(f"{name} does not contain the eMudhra fix")
    print(f"Security dependencies verified: Flutter {pinned}, Dart {sdk['dartSdkVersion']}, "
          f"cloud_firestore {'.'.join(map(str, firestore))}, FirebaseFirestore {match[1]}")


if __name__ == "__main__":
    main()
