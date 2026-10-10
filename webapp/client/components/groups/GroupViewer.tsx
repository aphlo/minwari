"use client";

import { Button } from "@heroui/button";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Header } from "@/client/components/layout/Header";
import type { GroupDetail } from "@/shared/types/groupDetail";
import { GroupDetailClient } from "./GroupDetailClient";
import { SettlementDetailClient } from "./SettlementDetailClient";

type State = {
  id: string;
  detail: GroupDetail | null;
  error: "missingId" | "notFound" | "error" | null;
  loading: boolean;
};

export function GroupViewer() {
  const params = useSearchParams();
  const id = params.get("id") ?? "";
  const t = useTranslations("viewer");
  const [state, setState] = useState<State>({
    id: "",
    detail: null,
    error: null,
    loading: true,
  });
  const [revision, setRevision] = useState(0);
  const refresh = useCallback(() => setRevision((value) => value + 1), []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: revision explicitly triggers a manual refresh.
  useEffect(() => {
    const controller = new AbortController();
    if (!id) {
      setState({ id, detail: null, error: "missingId", loading: false });
      return () => controller.abort();
    }
    setState((previous) => ({
      id,
      detail: previous.id === id ? previous.detail : null,
      error: null,
      loading: true,
    }));
    async function load() {
      try {
        const response = await fetch(`/api/groups/${encodeURIComponent(id)}`, {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) {
          if (!controller.signal.aborted)
            setState({
              id,
              detail: null,
              error: response.status === 404 ? "notFound" : "error",
              loading: false,
            });
          return;
        }
        const detail: GroupDetail = await response.json();
        if (!controller.signal.aborted)
          setState({ id, detail, error: null, loading: false });
      } catch {
        if (!controller.signal.aborted)
          setState({ id, detail: null, error: "error", loading: false });
      }
    }
    void load();
    return () => controller.abort();
  }, [id, revision]);

  const current =
    state.id === id ? state : { detail: null, error: null, loading: true };
  const controls = (
    <div className="space-y-3">
      <p className="text-sm text-muted">{t("readOnly")}</p>
      {id && (
        <Button
          className="w-full"
          variant="bordered"
          onPress={refresh}
          isLoading={current.loading}
        >
          {t("refresh")}
        </Button>
      )}
    </div>
  );
  return (
    <>
      {current.detail ? (
        params.get("view") === "settlement" ? (
          <SettlementDetailClient detail={current.detail} controls={controls} />
        ) : (
          <GroupDetailClient
            controls={controls}
            group={current.detail.group}
            initialExpenses={current.detail.expenses}
            initialSettlements={current.detail.settlements}
          />
        )
      ) : (
        <>
          <Header />
          <main className="pt-24 px-6 max-w-md mx-auto" aria-live="polite">
            <p className="mb-6">
              {current.error ? t(current.error) : t("loading")}
            </p>
            {controls}
          </main>
        </>
      )}
    </>
  );
}
