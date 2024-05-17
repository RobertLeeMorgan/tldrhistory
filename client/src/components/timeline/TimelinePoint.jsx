import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useYear } from "../../context/YearContext";
import { useAuth } from "../../context/AuthContext";
import formatDate from "../../util/formatDate";
import { extractYear } from "../../util/formatWidget";
import { deleteArticle, queryClient } from "../../util/http";
import { toast } from "react-toastify";
import DeleteModal from "../util/DeleteModal";
import Card from "./Card";

export default function TimelinePoint({ details, even, innerRef }) {
  const navigate = useNavigate();
  const { isAuth, logout } = useAuth();
  const { updateYear } = useYear();
  const { ref, inView, entry } = useInView({
    rootMargin: "0px 0px -70% 0px",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteArticle,
    optimisticResponse: () => {
      return !details.liked;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "civil"] });
      toast.success("Your article has been deleted!");
      navigate("/");
    },
    onError: () => {
      if (error.message === "jwt expired") {
        logout();
        toast("Your session has expired, please log in again.");
        navigate("/login");
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    },
  });

  const isMobile = window.innerWidth <= 768;

  function handleSubmit() {
    mutate({ id: details.id, token: isAuth.token });
  }

  useEffect(() => {
    if (inView) {
      const element = entry.target;
      const date = element.textContent;
      const year = extractYear(date);
      updateYear(year);
      element.classList.add("text-slate-100");
    } else if (entry) {
      entry.target.classList.remove("text-slate-100");
    }
  }, [inView, entry, updateYear]);

  return (
    <>
      <DeleteModal
        handleDelete={handleSubmit}
        isPending={isPending}
        id={details.id}
      />
      <li>
        <div className="timeline-middle w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-6 w-6"
          >
            <circle
              cx="10"
              cy="10"
              r="5"
              fill="currentColor"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          className={
            even
              ? "timeline-start md:text-start text-left mb-5"
              : "timeline-end mb-5"
          }
        >
          <div
            className={
              even
                ? "timeline-start md:text-end mb-5"
                : "timeline-end text-left mb-5"
            }
          >
            <time ref={ref} className="font-mono italic text-slate-300 text-lg">
              {formatDate(details.start)}
            </time>
          </div>
          <div
            className="card bg-base-100 shadow-xl"
            style={{
              width: "clamp(350px, 40vw, 550px)",
              ...(isMobile && { width: "max(350px, 70vw)" }),
            }}
            ref={innerRef}
          >
            <Card
              liked={details.liked}
              key={details.id}
              id={details.id}
              start={formatDate(details.start)}
              end={formatDate(details.end)}
              name={details.name}
              type={details.type}
              country={details.countryId}
              cause={details.cause}
              description={details.description}
              subject={details.subjects}
              username={details.user.username}
              userId={details.userId}
              created={details.createdAt}
            />
          </div>
        </div>
        <hr />
      </li>
    </>
  );
}
