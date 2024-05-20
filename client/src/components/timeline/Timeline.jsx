import { useInView } from "react-intersection-observer";
import { Suspense, useEffect, lazy } from "react";

const DeleteArticle = lazy(() => import("./DeleteArticle"));
const LikeArticle = lazy(() => import("./LikeArticle"));
const TimelinePoint = lazy(() => import("./TimelinePoint"));

export default function Timeline({
  data,
  status,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  if (data.pages.every((page) => page.length === 0)) {
    return (
      <p className="text-center font-mono italic text-slate-300 mt-2 text-xl">
        No articles found.
      </p>
    );
  }

  return (
    <>
      <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical my-5 mb-60">
        {data.pages &&
          data.pages.map((page, pageIndex) =>
            page.map((e, cardIndex, arr) => {
              const isLastCard =
                pageIndex === data.pages.length - 1 &&
                cardIndex === arr.length - 1;
              return (
                <Suspense key={e.id} fallback={<></>}>
                  <TimelinePoint
                    liked={e.liked}
                    details={e}
                    id={e.id}
                    even={cardIndex % 2 === 0}
                    innerRef={isLastCard ? ref : null}
                  />
                </Suspense>
              );
            })
          )}
        {!hasNextPage && (
          <p className="text-center font-mono italic text-slate-100 mt-5 text-xl">
            You have reached the end of time.
          </p>
        )}
        {isFetchingNextPage && (
          <div className="flex justify-center items-center h-full mt-5">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        )}
      </ul>
      <Suspense fallback={<></>}>
        <DeleteArticle />
        <LikeArticle />
      </Suspense>
    </>
  );
}
