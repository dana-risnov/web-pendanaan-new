import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect } from 'react'

const BTN = ({ active, onClick, title, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    style={{
      width: 28, height: 26, border: 'none', borderRadius: 4,
      background: active ? '#e2e8f0' : 'transparent',
      cursor: 'pointer', fontSize: 12, fontWeight: 600,
      color: active ? '#1e293b' : '#475569',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'inherit', transition: 'background .1s',
    }}
    onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#f1f5f9' }}
    onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
  >
    {children}
  </button>
)

const Divider = () => (
  <span style={{ width: 1, height: 18, background: '#e2e8f0', margin: '0 4px', display: 'inline-block', verticalAlign: 'middle' }} />
)

export default function RichEditor({ placeholder = 'Tulis disini', value, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value === '') {
      editor.commands.clearContent()
    }
  }, [value])

  if (!editor) return null

  return (
    <div style={{
      border: '0.5px solid #cbd5e1', borderRadius: 8, overflow: 'hidden',
      background: '#fff',
    }}>
      {/* Toolbar */}
      <div style={{
        padding: '6px 10px', borderBottom: '0.5px solid #e2e8f0',
        display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap',
        background: '#f8fafc',
      }}>
        {/* Text style */}
        <BTN active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()} title="Bold"><b>B</b></BTN>
        <BTN active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()} title="Italic"><i>I</i></BTN>
        <BTN active={editor.isActive('underline')} onClick={() => editor.chain().focus().toggleUnderline().run()} title="Underline"><u>U</u></BTN>
        <BTN active={editor.isActive('strike')} onClick={() => editor.chain().focus().toggleStrike().run()} title="Strikethrough"><s>S</s></BTN>

        <Divider />

        {/* Heading */}
        <BTN active={editor.isActive('heading', { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} title="Heading 1">H1</BTN>
        <BTN active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} title="Heading 2">H2</BTN>
        <BTN active={editor.isActive('paragraph')} onClick={() => editor.chain().focus().setParagraph().run()} title="Paragraph">¶</BTN>

        <Divider />

        {/* Align */}
        <BTN active={editor.isActive({ textAlign: 'left' })} onClick={() => editor.chain().focus().setTextAlign('left').run()} title="Align left">≡</BTN>
        <BTN active={editor.isActive({ textAlign: 'center' })} onClick={() => editor.chain().focus().setTextAlign('center').run()} title="Align center">☰</BTN>
        <BTN active={editor.isActive({ textAlign: 'right' })} onClick={() => editor.chain().focus().setTextAlign('right').run()} title="Align right">≡</BTN>
        <BTN active={editor.isActive({ textAlign: 'justify' })} onClick={() => editor.chain().focus().setTextAlign('justify').run()} title="Justify">☰</BTN>

        <Divider />

        {/* Lists */}
        <BTN active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()} title="Bullet list">• —</BTN>
        <BTN active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()} title="Numbered list">1.</BTN>

        <Divider />

        {/* Undo / Redo */}
        <BTN onClick={() => editor.chain().focus().undo().run()} title="Undo">↩</BTN>
        <BTN onClick={() => editor.chain().focus().redo().run()} title="Redo">↪</BTN>

        {/* Word count */}
        <span style={{ marginLeft: 'auto', fontSize: 11, color: '#94a3b8', paddingRight: 4 }}>
          {editor.storage.characterCount?.words?.() ?? editor.getText().trim().split(/\s+/).filter(Boolean).length} kata
        </span>
      </div>

      {/* Editor area */}
      <EditorContent
        editor={editor}
        style={{ minHeight: 180, padding: '14px 16px', fontSize: 14, color: '#1e293b', lineHeight: 1.75 }}
      />

      <style>{`
        .ProseMirror { outline: none; min-height: 160px; }
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left; color: #94a3b8; pointer-events: none; height: 0;
        }
        .ProseMirror ul { padding-left: 20px; }
        .ProseMirror ol { padding-left: 20px; }
        .ProseMirror h1 { font-size: 22px; font-weight: 700; margin-bottom: 8px; }
        .ProseMirror h2 { font-size: 18px; font-weight: 600; margin-bottom: 6px; }
        .ProseMirror p { margin-bottom: 8px; }
      `}</style>
    </div>
  )
}
