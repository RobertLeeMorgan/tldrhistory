import Timeline from "../components/timeline/Timeline";
import Drawer from "../components/drawer/Drawer";
import SearchBar from "../components/util/SearchBar";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { fetchPosts } from "../util/http";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filter, setFilter] = useState(initialFilter);
  const { isAuth, logout } = useAuth();
  const navigate = useNavigate()

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
    setIsDrawerOpen(false);
  }

  function handleReset() {
    setFilter(initialFilter);
    setIsDrawerOpen(false);
  }

  function openDrawer() {
    setIsDrawerOpen(true);
  }

  function handleSort() {
    setFilter((prevFilter) => ({
      ...prevFilter,
      sortBy: !prevFilter.sortBy,
    }));
  }

  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["posts", filter],
      queryFn: (pageParam) =>
        fetchPosts({ page: pageParam, filter, token: isAuth.token }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.length ? allPages.length + 1 : undefined;
        return nextPage;
      },
      onError: (error) => {
        if (error.message === "jwt expired") {
          logout();
          toast("Your session has expired.");
          navigate("/");
        } else {
          throw error
        }}
    })

  return (
    <>
      <SearchBar handleOpen={openDrawer} handleSort={handleSort} />
      {isDrawerOpen && (
        <Drawer onSubmit={handleSubmit} onReset={handleReset} filter={filter} />
      )}
      <div className="text-center text-neutral-content mt-40">
        <div className="max-w-md">
          {!isAuth.token && (
            <>
              <h1 className="mb-5 text-5xl font-bold text-slate-200">
                TLDR History;
              </h1>
              <p className="mb-12 text-slate-300 text-lg">
                Welcome to TLDR History! A big picture, non-academic visual
                database of pop world history.
              </p>
            </>
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
