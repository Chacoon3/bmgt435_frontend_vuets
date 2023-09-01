import { reactive } from "vue";
import router, { routePaths } from "@/router";

export type ErrorContext = {
  error: any | null;
  message: string | null;
};

const errorContext = reactive<ErrorContext>({
  error: null,
  message: null,
});

function setErrorContext(error: any, message: string | null = null) {
  errorContext.message = message;
  errorContext.error = error;

  if (error !== null) {
    router.push({ name: routePaths.errorPage });
  }
}

export function globalErrorHandler(
  err: unknown,
  instance: any | null,
  info: string
) {
  console.log("uncaughtErrorHandler starts -- -- -- -- -- -- -- --");
  console.log(err);
  console.log(instance);
  console.log(info);
  console.log("uncaughtErrorHandler ends -- -- -- -- -- -- -- --");

  setErrorContext(err);
}

export default function useErrorUtil() {
  return { errorContext: errorContext, setErrorContext: setErrorContext };
}
