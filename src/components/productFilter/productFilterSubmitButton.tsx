export const ProductFilterSubmitButton = ({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) => (
  <button
    type="submit"
    className={`action-md flex h-14 w-full items-center justify-center rounded-[.625rem] bg-orange-base px-4 text-white transition-colors duration-200 ${
      isSubmitting ? "cursor-not-allowed opacity-55" : "hover:bg-orange-dark"
    }`}
    disabled={isSubmitting}
  >
    Apply Filter
  </button>
);
