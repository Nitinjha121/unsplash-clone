import { useRef, useContext } from "react";
import { useRouter } from "next/router";
import Context from "../../store/context";

function useSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  const loadingCtx = useContext(Context);

  const router = useRouter();

  const seacrhHandler = function (e: any) {
    loadingCtx.setIsLoading(true);
    e.preventDefault();
    if (inputRef.current) {
      router.push(`/search?query=${inputRef.current.value}&page=${1}`);

      router.locale = inputRef.current.value;
      inputRef.current.value = "";
    }

    loadingCtx.setIsLoading(false);
  };

  return { inputRef, seacrhHandler };
}

export default useSearch;
