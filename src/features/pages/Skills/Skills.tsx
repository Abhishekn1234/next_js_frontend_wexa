import { useState, useEffect, useRef } from "react";
import { useSkills } from "./presentation/hooks/useSkills";
import { useDebounce } from "../../components/hooks/useDebounce";


import ErrorStates from "../../components/common/ErrorStates";
import { SkillsHeader } from "./presentation/components/SkillsHeader";
import { SkillsSearch } from "./presentation/components/SkillsSearch";
import { SkillsEmpty } from "./presentation/components/SkillsEmpty";
import { SkillsGrid } from "./presentation/components/SkillsGrid";

export default function Skills() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const limit = 10;
  const observerRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSkills(limit, debouncedSearch);

  const skills = data?.pages.flatMap((page) => page.skills ?? []) ?? [];
  const total = data?.pages[0]?.pagination?.total ?? skills.length;

  useEffect(() => {
    const element = observerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasNextPage &&
          !isFetchingNextPage
        ) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-6">
      <SkillsHeader isFetching={isFetching} onRefresh={() => refetch()} />

      <SkillsSearch search={search} onSearchChange={setSearch} />

      {isError && (
        <ErrorStates
          title="Failed to load skills"
          message={
            error instanceof Error
              ? error.message
              : "Something went wrong while loading skills."
          }
          onRetry={() => refetch()}
        />
      )}

      {!isError && skills.length === 0 && !isLoading && (
        <SkillsEmpty search={search} onClearSearch={() => setSearch("")} />
      )}

      <SkillsGrid
        skills={skills}
        total={total}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        observerRef={observerRef}
      />
    </div>
  );
}