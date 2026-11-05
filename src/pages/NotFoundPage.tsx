import { Link } from "react-router-dom";
import { NotFoundSeo } from "@/components/Seo";
import { EmptyState } from "@/components/arc/empty-state/empty-state";
import styles from "./NotFoundPage.module.css";

/** Any path that is not a route. Prerendered to dist/404.html, which Pages serves with a 404. */
export function NotFoundPage() {
  return (
    <div className="page band">
      <NotFoundSeo title="找不到這個頁面 · Finrod Chen" />
      <EmptyState
        title="找不到這個頁面"
        description="連結可能拼錯了，或這個頁面已經搬走。"
        label="找不到頁面"
        action={
          <Link to="/" className={styles.backLink}>
            回到首頁
          </Link>
        }
      />
    </div>
  );
}
