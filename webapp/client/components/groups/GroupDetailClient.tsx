"use client";

import { Chip } from "@heroui/chip";
import { useTranslations } from "next-intl";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { getMemberChipColor } from "@/client/lib/memberColor";
import { addRecentGroup } from "@/client/lib/recentGroups";
import type { CurrencyCode } from "@/shared/lib/currency";
import { Header } from "../layout/Header";
import { ExpenseList } from "./ExpenseList";
import { OpenInAppBanner } from "./OpenInAppBanner";
import { SettlementSection } from "./SettlementSection";

type SerializedGroup = {
  id: string;
  name: string;
  members: string[];
  currency: CurrencyCode;
  createdAt: string;
  updatedAt: string;
};

type SerializedExpense = {
  id: string;
  groupId: string;
  description: string;
  amount: number;
  paidBy: string;
  splitWith: string[];
  createdAt: string;
  updatedAt: string;
};

type SerializedSettlement = {
  from: string;
  to: string;
  amount: number;
};

type Props = {
  group: SerializedGroup;
  initialExpenses: SerializedExpense[];
  initialSettlements: SerializedSettlement[];
  controls: ReactNode;
};

export function GroupDetailClient({
  group,
  initialExpenses,
  initialSettlements,
  controls,
}: Props) {
  const expenses = initialExpenses;
  const settlements = initialSettlements;
  const [bannerVisible, setBannerVisible] = useState(false);
  const t = useTranslations("group");
  const handleBannerVisibility = useCallback((visible: boolean) => {
    setBannerVisible(visible);
  }, []);

  useEffect(() => {
    addRecentGroup({
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
    });
  }, [group.id, group.name, group.createdAt]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <OpenInAppBanner
        groupId={group.id}
        onVisibilityChange={handleBannerVisibility}
      />

      {/* Main Content */}
      <main
        className={`pb-16 px-6 lg:px-8 transition-[padding] ${bannerVisible ? "pt-[8.5rem] md:pt-20" : "pt-20"}`}
      >
        <div className="max-w-md mx-auto space-y-6">
          {controls}
          {/* Group Summary */}
          <div className="animate-fade-in-up opacity-0 bg-card rounded-2xl border border-border p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl font-bold text-foreground truncate">
                  {group.name}
                </h1>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.members.map((member) => (
                    <Chip
                      key={member}
                      color={getMemberChipColor(member)}
                      variant="flat"
                      size="sm"
                    >
                      {member}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Expense List */}
          <div className="animate-fade-in-up delay-200 opacity-0">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {t("sections.expenses")}
            </h2>
            <ExpenseList expenses={expenses} currency={group.currency} />
          </div>

          {/* Settlement Section */}
          <div className="animate-fade-in-up delay-300 opacity-0">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              {t("sections.settlement")}
            </h2>
            <SettlementSection
              expenses={expenses}
              settlements={settlements}
              groupId={group.id}
              currency={group.currency}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
