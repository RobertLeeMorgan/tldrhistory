import { useQuery } from "@tanstack/react-query";
import { fetchValues } from "../../util/http";
import { decodedText } from "../../util/formatText";
import DateInput from "./DateInput";
import Rules from "./Rules";
import useDateInputs from "../../hooks/useDateInputs";
import AlertMessage from "../util/AlertMessage";
import { useState } from "react";

export default function Form({
  onSubmit,
  isPending,
  article,
  isError,
  error,
  isEditing,
}) {
  const [checkDates, handleDateChange] = useDateInputs(article);
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["values"],
    queryFn: fetchValues,
    throwOnError: true,
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const article = Object.fromEntries(formData);
    article.subjectId = formData.getAll("subjectId");
    ["start_month", "start_day", "end_year", "end_month", "end_day"].forEach(
      (field) => {
        if (!article[field]) {
          article[field] = 0;
        }
      }
    );
    if (!article.subjectId.length) {
      setErrorMessage("At least one subject must be selected!");
    } else {
      onSubmit(article);
    }
  }

  return (
    <>
      <Rules />
      <div>
        <div className="text-center mt-40">
          <h2 className="text-3xl font-semibold leading-7">
            {isEditing ? "Edit Article" : "Post Article"}
            <div className="tooltip" data-tip="Help">
              <button
                className="btn btn-circle btn-sm ml-4 align-middle"
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                ?
              </button>
            </div>
          </h2>
        </div>
        <form
          id="post-form"
          className="mt-8 md:mx-auto mx-12 max-w-3xl sm:px-4"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-y-6">
            <div className="sm:col-span-1">
              <div className="form-control my-4">
                <select
                  name="type"
                  id="type"
                  className="select select-bordered w-full"
                  required
                  defaultValue={isEditing && article.type}
                >
                  <option disabled selected value="">
                    What type of article are you posting?
                  </option>
                  <option value="person">Person</option>
                  <option value="landmark">Landmark</option>
                  <option value="event">Event</option>
                  <option value="period">Period</option>
                </select>
              </div>
              <div className="form-control my-4">
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={isEditing ? decodedText(article.name) : ""}
                  placeholder="Title"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control my-4">
                <textarea
                  className="textarea textarea-bordered w-full"
                  placeholder="Description"
                  id="description"
                  name="description"
                  defaultValue={
                    isEditing ? decodedText(article.description) : ""
                  }
                  required
                ></textarea>
              </div>
              <DateInput
                label="Start"
                namePrefix="start"
                checkDates={checkDates}
                handleChange={handleDateChange}
              />
              <DateInput
                label="End"
                namePrefix="end"
                checkDates={checkDates}
                handleChange={handleDateChange}
              />
            </div>
            <div className="sm:col-span-1 mx-1">
              <div className="form-control my-4">
                <select
                  name="location"
                  id="location"
                  className="select select-bordered w-full"
                  required
                >
                  {isEditing ? (
                    <option selected>{article.countryId}</option>
                  ) : (
                    <option disabled selected value="">
                      Location
                    </option>
                  )}
                  {data.countries.map((e, i) => {
                    return (
                      <option key={i} defaultValue={e.name}>
                        {e.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-control my-4">
                <input
                  type="text"
                  id="cause"
                  name="cause"
                  defaultValue={
                    isEditing ? article.cause && decodedText(article.cause) : ""
                  }
                  placeholder="How it ended?"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control my-4">
                <div>
                  {data.subjects.map((subject) => (
                    <label key={subject.id} className="label cursor-pointer">
                      <span className="label-text text-lg text-slate-300">
                        {subject.subject.charAt(0).toUpperCase() +
                          subject.subject.slice(1)}
                      </span>
                      <input
                        name="subjectId"
                        type="checkbox"
                        className="checkbox text-slate-200"
                        defaultValue={subject.id}
                        defaultChecked={
                          isEditing &&
                          article.subjects.some(
                            (s) => s.subject === subject.subject
                          )
                        }
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {errorMessage && <AlertMessage message={errorMessage} />}
          {isError && <AlertMessage message={error.message} />}
          <div className="form-control my-8">
            <div className="flex justify-center">
              {isPending ? (
                <button className="btn">
                  <span className="loading loading-spinner"></span>
                  Submitting
                </button>
              ) : (
                <button type="submit" className="btn btn-secondary w-24">
                  {isEditing ? "Edit" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
