import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
    value: string;
    setValue: (value: string) => void;
    error?: string | null
    disabled?: boolean;
}

export function TextEditor({ value, setValue, error, disabled }: TextEditorProps) {
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link']
        ],
    };

    return (
        <div className='TextEditor'>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules}
                className={`${error ? 'border border-[#CC000D]' : ''} Description text-[14px] font-Montserrat font-medium`}
                placeholder='Description'
                readOnly={disabled}
            />
        </div>
    );
}
