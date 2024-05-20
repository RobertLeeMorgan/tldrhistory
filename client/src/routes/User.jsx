import { useParams } from "react-router-dom";
import { fetchUser, fetchUsername } from "../util/http";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Timeline from "../components/timeline/Timeline";

export default function User() {
  const params = useParams();
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts", params],
    queryFn: (pageParam) =>
      fetchUser({ page: pageParam, params: params.id, token: isAuth.token }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  const { data: username, isPending } = useQuery({
    queryKey: ["username"],
    queryFn: () => fetchUsername({ id: params.id }),
    throwOnError: true,
  });

  if (isError && error.message === "jwt expired") {
    navigate("/login");
    logout();
    toast("Your session has expired, please log in.");
  } else if (isError) {
    throw error;
  }

  return (
    <div className="text-center text-neutral-content mt-40">
      <div className="max-w-md">
        {isPending ? null : (
          <h1 className="mb-12 text-5xl font-bold text-slate-200">{`${
            username.user.username.charAt(0).toUpperCase() +
            username.user.username.slice(1)
          }'s Timeline`}</h1>
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
