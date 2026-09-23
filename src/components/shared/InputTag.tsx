import { WithContext as ReactTags } from "react-tag-input";

interface InputTagProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  error?: string | null;
  isLoading?: boolean | undefined;
}

export const normalizeTags = (tags: string[]): string[] => {
  const seen = new Set<string>();

  return tags.reduce<string[]>((uniqueTags, tag) => {
    const normalizedTag = tag.trim();
    const key = normalizedTag.toLowerCase();

    if (normalizedTag && !seen.has(key)) {
      seen.add(key);
      uniqueTags.push(normalizedTag);
    }

    return uniqueTags;
  }, []);
};

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
    const newTag = tag.text.trim();
    const hasDuplicate = tags.some(
      (existingTag) => existingTag.trim().toLowerCase() === newTag.toLowerCase()
    );

    if (!isLoading && tags.length < Max_tag && newTag && !hasDuplicate) {
      setTags(normalizeTags([...tags, newTag]));
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
