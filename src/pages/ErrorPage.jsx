import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-200 text-center px-4">
      <h1 className="text-5xl font-bold text-error mb-4">Oops!</h1>
      <p className="text-lg text-base-content/70 mb-2">
        Something went wrong or the page doesn't exist.
      </p>
      <a
        href="/"
        className="mt-4 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary-focus transition"
      >
        Go Home
      </a>
    </div>
  );
};

export default ErrorPage;
