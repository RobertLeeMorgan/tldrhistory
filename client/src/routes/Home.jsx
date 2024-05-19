import Timeline from "../components/timeline/Timeline";
import { useAuth } from "../context/AuthContext";
import { useState, lazy, Suspense } from "react";
import { fetchPosts } from "../util/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SearchBar = lazy(() => import("../components/util/SearchBar"));
const Drawer = lazy(() => import("../components/drawer/Drawer"));

export default function HomePage() {
  const initialFilter = {
    type: [],
    subject: [],
    continent: [],
    year_start: "",
    year_end: "",
    search: "",
    sortBy: true,
  };
  const [filter, setFilter] = useState(initialFilter);
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newFilter = {
      type: formData.getAll("type"),
      subject: formData.getAll("subject"),
      continent: formData.getAll("continent"),
      year_start: formData.get("start"),
      year_end: formData.get("end"),
      search: formData.get("search"),
    };
    setFilter((prevFilter) => ({
      ...prevFilter,
      ...newFilter,
    }));
    document.getElementById(`my-drawer`).checked = false;
  }

  function handleReset() {
    setFilter(initialFilter);
    document.getElementById(`my-drawer`).checked = false;
  }

  function handleSort() {
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortBy: !prevFilter.sortBy,
    }));
  }

  const {
    data,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["posts", filter],
    queryFn: (pageParam) =>
      fetchPosts({ page: pageParam, filter, token: isAuth.token }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.length ? allPages.length + 1 : undefined;
      return nextPage;
    },
  });

  if (isError && error.message === "jwt expired") {
    navigate("/login");
    logout();
    toast("Your session has expired, please log in.");
  } else if (isError) {
    throw error;
  }

  return (
    <>
      <Suspense
        fallback={<></>}
      >
        <SearchBar handleSort={handleSort} />
        <Drawer onSubmit={handleSubmit} onReset={handleReset} filter={filter} />
      </Suspense>
      <div className="text-center text-neutral-content mt-40">
        <div className="max-w-md">
          {!isAuth.token && (
            <div className='max-w-md'>
              <h1 className="mb-5 text-4xl md:text-5xl font-bold text-slate-200">
                TLDR History;
              </h1>
              <p className="mb-12 px-14 md:px-0 text-slate-300 text-lg">
                Welcome to TLDR History! A big picture, non-academic visual
                database of pop world history.
              </p>
            </div>
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
    </>
  );
}
