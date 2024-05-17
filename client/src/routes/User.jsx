import { useParams } from "react-router-dom";
import { fetchUser } from "../util/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import Timeline from "../components/timeline/Timeline";

export default function User() {
  const params = useParams();
  const { isAuth, logout } = useAuth();

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: (pageParam) =>
      fetchUser({ page: pageParam, params: params.id, token: isAuth.token }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
    onError: (error) => {
      if (error.message === "jwt expired") {
        logout();
        toast("Your session has expired, you have been logged out.");
      } else {
        throw error
      }}
  });

  return (
    <div className="text-center text-neutral-content mt-40">
      <div className="max-w-md">
        {isPending ? (
          null
        ) : (
          <h1 className="mb-12 text-5xl font-bold text-slate-200">{`${data.pages[0][0].user.username}'s Timeline`}</h1>
        )}
        <Timeline
          data={data}
          status={status}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}
