import { WithContext as ReactTags } from "react-tag-input";

interface InputTagProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  error?: string | null;
  isLoading?: boolean | undefined;
}
const InputTag: React.FC<InputTagProps> = ({
  tags = [],
  setTags,
  error,
  isLoading,
}) => {
  const Max_tag = 5;
  const handleDelete = (index: number) => {
    if (!isLoading) {
      setTags(tags.filter((_, i) => i !== index));
    }
  };

  const handleAddition = (tag: any) => {
    if (!isLoading && tags.length < Max_tag && tag.text.trim() !== "") {
      setTags([...tags, tag.text]);
    }
  };

  const formattedTags = tags.map((tag, index) => ({
    id: index.toString(),
    text: tag,
    className: "custom-tag",
  }));

  return (
    <div
      className={`${error ? "border border-[#CC000D]" : ""} w-full ${
        tags.length >= Max_tag ? "mb-[10px]" : "mb-0"
      }`}
    >
      <ReactTags
        tags={formattedTags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        allowAdditionFromPaste={false}
        clearAll
        maxTags={Max_tag}
        placeholder="Write a key word, and hit enter to add tag"
        autoFocus={false}
      />
    </div>
  );
};

export default InputTag;
