"use client";

import { useRouter } from "next/navigation";

/**
 * Props for {@link PageHeaderClient}.
 */
type PageHeaderClientProps = {
    /**
     * Title displayed on the right side of the header.
     * @defaultValue "Meet Up"
     */
    title?: string;

    /**
     * Human-friendly destination label shown in the "back" button text:
     * `← Volver a {returnTo}`.
     *
     * Note: this does **not** control navigation. Navigation is controlled by `backHref`.
     * @defaultValue "login"
     */
    returnTo?: string;

    /**
     * Fallback URL used when we can't (or shouldn't) navigate back using browser history.
     *
     * Examples:
     * - "/login"
     * - "/dashboard"
     */
    backHref: string;

    /**
     * If `true`, the component will try to go back using `router.back()` when there is
     * browser history available.
     *
     * If `false`, it will always navigate using `router.push(backHref)` unless `forceBackHref` is `true`.
     *
     * @defaultValue true
     */
    preferHistoryBack?: boolean;

    /**
     * If `true`, always navigate using `backHref` (via `router.push(backHref)`),
     * ignoring browser history.
     *
     * Useful when you want predictable navigation (e.g., when landing directly on a page
     * from an external link, or when "back" could lead somewhere unexpected).
     *
     * @defaultValue false
     */
    forceBackHref?: boolean;
};

/**
 * Client-side page header with a back button and a title.
 *
 * ## Navigation behavior (priority order)
 * 1) If `forceBackHref` is `true` → `router.push(backHref)`
 * 2) Else if `preferHistoryBack` is `true` and there is browser history (`window.history.length > 1`)
 *    → `router.back()`
 * 3) Else → `router.push(backHref)`
 *
 * ## Why check `window.history.length > 1`?
 * It helps avoid calling `router.back()` when the user opened the page in a fresh tab
 * (or arrived directly), where "back" would do nothing or produce a confusing result.
 */
export function PageHeaderClient({
    title = "Meet Up",
    returnTo = "login",
    backHref,
    preferHistoryBack = true,
    forceBackHref = false,
}: PageHeaderClientProps) {
    const router = useRouter();

    /**
     * Handles the "back" action using history when appropriate, otherwise falls back
     * to pushing `backHref`.
     */
    const onBack = () => {
        if (forceBackHref) {
            router.push(backHref);
            return;
        }

        if (preferHistoryBack && typeof window !== "undefined" && window.history.length > 1) {
            router.back();
        } else {
            router.push(backHref);
        }
    };

    return (
        <div className="mb-4 flex items-center justify-between">
            <button
                type="button"
                onClick={onBack}
                className="text-sm text-slate-600 hover:text-slate-900"
                aria-label={`Volver a ${returnTo}`}
            >
                ← Volver a {returnTo}
            </button>

            <span className="text-sm font-semibold text-slate-900">{title}</span>
        </div>
    );
}
