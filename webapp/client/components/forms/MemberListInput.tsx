"use client";

import { Input } from "./Input";

type Member = {
  id: string;
  name: string;
};

type Props = {
  members: Member[];
  errors: Record<string, string>;
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, name: string) => void;
};

export function MemberListInput({
  members,
  errors,
  onAdd,
  onRemove,
  onUpdate,
}: Props) {
  return (
    <div className="space-y-4">
      <span className="block text-sm font-medium text-foreground mb-2">
        メンバー名
      </span>

      <div className="space-y-3">
        {members.map((member, index) => (
          <div
            key={member.id}
            className="flex items-center gap-2 animate-fade-in"
          >
            <div className="flex-1">
              <Input
                name={`member-${member.id}`}
                placeholder={`メンバー ${index + 1}`}
                value={member.name}
                onChange={(e) => onUpdate(member.id, e.target.value)}
                isInvalid={!!errors[`member-${member.id}`]}
                errorMessage={errors[`member-${member.id}`]}
                variant="bordered"
                radius="lg"
              />
            </div>
            {members.length > 0 && (
              <button
                type="button"
                onClick={() => onRemove(member.id)}
                className="p-2 text-muted hover:text-red-500 transition-colors rounded-full hover:bg-bg-tertiary"
                aria-label="メンバーを削除"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition-colors px-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12h8" />
          <path d="M12 8v8" />
        </svg>
        メンバーを追加する
      </button>
    </div>
  );
}
