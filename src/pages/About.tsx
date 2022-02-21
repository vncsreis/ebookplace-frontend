import { ContentLayout } from "../components/layouts/ContentLayout";
import { PageLayout } from "../components/layouts/PageLayout";
import { tw } from "../utilities/tw";

export function About() {
  return (
    <PageLayout>
      <ContentLayout>
        <h1 className={tw("text-5xl dark:text-gray-100 pb-12")}>
          About Ebookplace
        </h1>
        <p className={tw("pb-5 text-2xl")}>
          This website's objective is to allow the user to upload and read .epub
          files on their browser, wherever they go. The user can manage their
          books on the "mybooks" section, filtering by genre and toggling
          favourites.
        </p>
        <p className={tw("pb-5 text-2xl")}>
          The technologies used were mainly React and TailwindCSS.
        </p>
      </ContentLayout>
    </PageLayout>
  );
}
