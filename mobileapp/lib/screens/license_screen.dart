import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:minwari/theme/app_theme_extension.dart';

class LicenseScreen extends StatelessWidget {
  final String? applicationName;
  final String? applicationVersion;

  const LicenseScreen({
    super.key,
    this.applicationName,
    this.applicationVersion,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: context.scaffoldBackgroundColor,
      appBar: AppBar(
        title: Text(
          context.l10n.license,
          style: TextStyle(color: context.textPrimary),
        ),
        backgroundColor: context.appBarBackgroundColor,
        elevation: 0,
        iconTheme: IconThemeData(color: context.textPrimary),
        leading: IconButton(
          icon: const Icon(CupertinoIcons.xmark),
          onPressed: () => Navigator.of(context).pop(),
        ),
      ),
      body: _LicenseBody(
        applicationName: applicationName,
        applicationVersion: applicationVersion,
      ),
    );
  }
}

class _LicenseBody extends StatefulWidget {
  final String? applicationName;
  final String? applicationVersion;

  const _LicenseBody({
    this.applicationName,
    this.applicationVersion,
  });

  @override
  State<_LicenseBody> createState() => _LicenseBodyState();
}

class _LicenseBodyState extends State<_LicenseBody> {
  final List<LicenseEntry> _licenses = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadLicenses();
  }

  Future<void> _loadLicenses() async {
    await for (final license in LicenseRegistry.licenses) {
      if (mounted) {
        setState(() {
          _licenses.add(license);
        });
      }
    }
    if (mounted) {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: _licenses.length + 1,
      itemBuilder: (context, index) {
        if (index == 0) {
          return _buildHeader(context);
        }
        final license = _licenses[index - 1];
        return _buildLicenseEntry(context, license);
      },
    );
  }

  Widget _buildHeader(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 24),
      child: Column(
        children: [
          if (widget.applicationName != null)
            Text(
              widget.applicationName!,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: context.textPrimary,
              ),
            ),
          if (widget.applicationVersion != null)
            Padding(
              padding: const EdgeInsets.only(top: 4),
              child: Text(
                widget.applicationVersion!,
                style: TextStyle(
                  fontSize: 14,
                  color: context.textSecondary,
                ),
              ),
            ),
          const SizedBox(height: 16),
          if (_isLoading)
            const CupertinoActivityIndicator()
          else
            Text(
              '${_licenses.length} licenses',
              style: TextStyle(
                fontSize: 14,
                color: context.textSecondary,
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildLicenseEntry(BuildContext context, LicenseEntry license) {
    final packages = license.packages.join(', ');
    final paragraphs = license.paragraphs.map((p) => p.text).join('\n\n');

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: context.cardBackground,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            packages,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: context.textPrimary,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            paragraphs,
            style: TextStyle(
              fontSize: 12,
              color: context.textSecondary,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
