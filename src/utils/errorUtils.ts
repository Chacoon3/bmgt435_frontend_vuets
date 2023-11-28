import { reactive } from "vue";
import router, { routePaths } from "@/router";

export type ErrorContext = {
  error: any | null;
  message: string | null;
};

export type ErrorMode = 
  "throw" |
  "handle"


const errorContext = reactive<ErrorContext>({
  error: null,
  message: null,
});

let errorMode = "throw" as ErrorMode;
function setErrorMode(mode: ErrorMode) {
  errorMode = mode;
}

function setErrorContext(error: any, message: string | null = null) {
  errorContext.message = message;
  errorContext.error = error;

  if (error !== null) {
    router.push({ name: routePaths.errorPage });
  }
}

function globalErrorHandler(
  err: unknown,
  instance: any | null,
  info: string
) {
  if (errorMode === "throw") {
    console.log("uncaughtErrorHandler starts -- -- -- -- -- -- -- --");
    console.log(err);
    console.log(instance);
    console.log(info);
    console.log("uncaughtErrorHandler ends -- -- -- -- -- -- -- --");
    throw err;
  }
  else{
    setErrorContext(err);  
  }
}

export default function useErrorUtils() {
  return { errorContext, setErrorContext, setErrorMode, globalErrorHandler };
}
