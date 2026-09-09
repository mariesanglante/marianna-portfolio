'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronRight,
  Download,
  FileText,
  Folder,
  Globe,
  History,
  Plus,
  Search,
  Send,
  Sparkles,
  X,
  RotateCcw,
  PanelRightClose,
  PanelRightOpen,
  Trash2,
  Pencil,
  Menu,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  sources,
  templates,
  makeDocument,
  revise,
  assistantChange,
  downloadText,
  type Doc,
  type Section,
  type Source,
} from './model';
import './prototype.css';
type Message = { role: 'archer' | 'you'; text: string };
type Collection = { name: string; ids: number[] };
const initialCollections: Collection[] = [
  { name: 'Healthcare SaaS', ids: [1, 2, 3] },
  { name: 'Technology', ids: [4, 5] },
  { name: 'Green energy', ids: [6] },
];
const welcome: Message[] = [
  {
    role: 'archer',
    text: 'Hi Marianna. Select a few sources and I’ll help turn your research into a document. You can review every change before it’s applied.',
  },
];
export default function SemaversePrototype({
  embedded = false,
}: {
  embedded?: boolean;
}) {
  const [view, setView] = useState('collection');
  const [collection, setCollection] = useState('Healthcare SaaS');
  const [collections, setCollections] = useState(initialCollections);
  const [saved, setSaved] = useState<number[]>([1, 2]);
  const [selected, setSelected] = useState<number[]>([1, 2, 3]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [active, setActive] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState<
    'create' | 'source' | 'revisions' | 'collection' | 'reset' | null
  >(null);
  const [source, setSource] = useState<Source>(sources[0]);
  const [title, setTitle] = useState('European healthcare SaaS');
  const [template, setTemplate] = useState(templates[0]);
  const [newCollection, setNewCollection] = useState('');
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Message[]>(welcome);
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [proposal, setProposal] = useState<{
    docId: string;
    sections: Section[];
    base: string;
  } | null>(null);
  const [notice, setNotice] = useState('');
  const [assistant, setAssistant] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [edit, setEdit] = useState<{
    id: string;
    title: string;
    body: string;
  } | null>(null);
  const [ready, setReady] = useState(false);
  const [storageOK, setStorageOK] = useState(true);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatEnd = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const doc = docs.find((d) => d.id === active);
  const current =
    collections.find((c) => c.name === collection) || collections[0];
  const visible = sources.filter(
    (s) =>
      (view === 'saved' ? saved.includes(s.id) : current.ids.includes(s.id)) &&
      (filter !== 'Saved' || saved.includes(s.id)) &&
      `${s.title} ${s.summary}`.toLowerCase().includes(search.toLowerCase()),
  );
  useEffect(() => {
    queueMicrotask(() => {
      if (window.matchMedia('(max-width:650px)').matches) setAssistant(false);
      try {
        const data = JSON.parse(
          localStorage.getItem('semaverse-demo-v1') || 'null',
        );
        if (
          data &&
          Array.isArray(data.docs) &&
          data.docs.every(
            (d: Doc) =>
              typeof d.id === 'string' &&
              Array.isArray(d.sections) &&
              Array.isArray(d.revisions),
          ) &&
          Array.isArray(data.saved) &&
          Array.isArray(data.collections) &&
          data.collections.length &&
          data.collections.every(
            (c: Collection) =>
              typeof c.name === 'string' && Array.isArray(c.ids),
          )
        ) {
          setDocs(data.docs);
          setSaved(data.saved);
          setCollections(data.collections);
        }
      } catch {
        setStorageOK(false);
      }
      setReady(true);
    });
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem(
          'semaverse-demo-v1',
          JSON.stringify({ docs, saved, collections }),
        );
      } catch {
        queueMicrotask(() => setStorageOK(false));
      }
  }, [ready, docs, saved, collections]);
  useEffect(() => {
    if (chatEnd.current)
      chatEnd.current.scrollTop = chatEnd.current.scrollHeight;
  }, [messages, busy, proposal]);
  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(''), 4500);
      return () => clearTimeout(t);
    }
  }, [notice]);
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [view, active, collection]);
  function navigate(v: string, c?: string) {
    setView(v);
    setSearch('');
    setFilter('All');
    setSidebar(false);
    setEdit(null);
    if (c) {
      setCollection(c);
      setSelected(collections.find((x) => x.name === c)?.ids || []);
    }
  }
  function openDoc(d: Doc) {
    setActive(d.id);
    navigate('document');
  }
  function toggleSave(id: number) {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }
  function updateDoc(next: Doc) {
    setDocs((prev) => prev.map((d) => (d.id === next.id ? next : d)));
  }
  function startJob(done: () => void) {
    if (busy) return;
    setBusy(true);
    setProgress(0);
    let p = 0;
    timer.current = setInterval(() => {
      p++;
      setProgress(p);
      if (p === 3) {
        if (timer.current) clearInterval(timer.current);
        timer.current = null;
        setBusy(false);
        done();
      }
    }, 650);
  }
  function stop() {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setBusy(false);
    setMessages((m) => [
      ...m,
      {
        role: 'archer',
        text: 'Stopped. Your documents are unchanged. Try again whenever you’re ready.',
      },
    ]);
  }
  function create() {
    const name = title.trim();
    if (!name) {
      setError('Give your document a name.');
      return;
    }
    if (!selected.length) {
      setError('Select at least one research source to ground the draft.');
      return;
    }
    setModal(null);
    setError('');
    setAssistant(true);
    setProposal(null);
    setMessages((m) => [
      ...m,
      {
        role: 'you',
        text: `Create ${template.toLowerCase()}: ${name}. Use ${selected.length} selected sources.`,
      },
    ]);
    startJob(() => {
      const next = makeDocument(name, template, selected);
      setDocs((d) => [next, ...d]);
      openDoc(next);
      setMessages((m) => [
        ...m,
        {
          role: 'archer',
          text: `Your ${template.toLowerCase()} is ready with ${next.sections.length} sections. Open the source references, edit the text, or ask me to refine a section.`,
        },
      ]);
      setNotice('Draft created and saved in this browser.');
    });
  }
  function send(text: string) {
    if (!text.trim() || busy) return;
    setPrompt('');
    setAssistant(true);
    setMessages((m) => [...m, { role: 'you', text: text.trim() }]);
    if (!doc || view !== 'document') {
      setMessages((m) => [
        ...m,
        {
          role: 'archer',
          text: 'Let’s ground this in your collection. Choose Create document to select a template and sources, or open a saved document to refine it.',
        },
      ]);
      return;
    }
    const target = doc;
    setProposal(null);
    startJob(() => {
      setProposal({
        docId: target.id,
        sections: assistantChange(target, text),
        base: JSON.stringify(target.sections),
      });
      setMessages((m) => [
        ...m,
        {
          role: 'archer',
          text: 'I’ve prepared a suggested edit. Review it below, then apply or discard it. Your current version is preserved in Revisions.',
        },
      ]);
    });
  }
  function exportDoc() {
    if (!doc) return;
    const url = URL.createObjectURL(
      new Blob([downloadText(doc)], { type: 'text/markdown;charset=utf-8' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = (doc.title.replace(/[^a-z0-9]+/gi, '-') || 'document') + '.md';
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice('Document exported as Markdown.');
  }
  function createDialog(t = templates[0]) {
    setTemplate(t);
    setTitle(
      collection === 'Healthcare SaaS'
        ? 'European healthcare SaaS'
        : collection + ' research',
    );
    setError('');
    setModal('create');
  }
  const navItem = (
    label: string,
    icon: React.ReactNode,
    onClick: () => void,
    isActive = false,
    count?: number,
  ) => (
    <button
      className={`sv-nav-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
      {count !== undefined && <small>{count}</small>}
    </button>
  );
  return (
    <section
      className={`sv-demo ${embedded ? 'sv-embedded' : ''}`}
      id="semaverse-prototype"
      aria-label="Semaverse interactive prototype"
    >
      <div className="sv-demo-bar">
        <Link href="/cases/semaverse">
          <ArrowLeft size={15} />{' '}
          {embedded ? 'Semaverse case study' : 'Back to case study'}
        </Link>
        <span>
          <i /> INTERACTIVE DEMO <b>· Sample data</b>
        </span>
        <div>
          {embedded && (
            <Link href="/semaverse">
              Open full screen <ArrowRight size={15} />
            </Link>
          )}
          <button onClick={() => setModal('reset')}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>
      <div className={`sv-app ${assistant ? '' : 'sv-no-assistant'}`}>
        <aside
          className={`sv-sidebar ${sidebar ? 'sv-mobile-open' : ''}`}
          aria-label="Workspace navigation"
        >
          <div className="sv-brand">
            <Image
              src="/images/semaverse/logo.svg"
              alt=""
              width={27}
              height={27}
              unoptimized
            />
            <div>
              <strong>Semaverse</strong>
              <small>Marianna’s workspace</small>
            </div>
            <button
              className="sv-mobile-close"
              onClick={() => setSidebar(false)}
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>
          <button
            className="sv-primary"
            onClick={() => createDialog()}
            disabled={busy}
          >
            <Plus size={17} /> Create document
          </button>
          <p className="sv-nav-label">WORKSPACE</p>
          {navItem(
            'Collections',
            <Globe size={17} />,
            () => navigate('collection'),
            view === 'collection',
          )}
          {navItem(
            'Saved items',
            <Bookmark size={17} />,
            () => navigate('saved'),
            view === 'saved',
            saved.length,
          )}
          {navItem(
            'My documents',
            <FileText size={17} />,
            () => navigate('documents'),
            view === 'documents',
            docs.length,
          )}
          <p className="sv-nav-label">TEMPLATES</p>
          {templates.map((t) => (
            <div key={t}>
              {navItem(t, <FileText size={16} />, () => createDialog(t))}
            </div>
          ))}
          <p className="sv-nav-label">
            MY COLLECTIONS{' '}
            <button
              aria-label="New collection"
              onClick={() => {
                setNewCollection('');
                setError('');
                setModal('collection');
              }}
            >
              <Plus size={15} />
            </button>
          </p>
          {collections.map((c) => (
            <div key={c.name}>
              {navItem(
                c.name,
                <Folder size={16} />,
                () => navigate('collection', c.name),
                view === 'collection' && collection === c.name,
                c.ids.length,
              )}
            </div>
          ))}
          <div className="sv-sidebar-bottom">
            <span className="sv-avatar">M</span>
            <div>
              <strong>Marianna</strong>
              <small>Personal workspace</small>
            </div>
            <span className="sv-demo-tag">Demo</span>
          </div>
        </aside>
        <div className="sv-workspace">
          <header className="sv-topbar">
            <div>
              <button
                className="sv-menu"
                aria-label="Open navigation"
                onClick={() => setSidebar(true)}
              >
                <Menu size={20} />
              </button>
              <span>Workspace</span>
              <ChevronRight size={14} />
              <strong>
                {view === 'document'
                  ? doc?.template
                  : view === 'saved'
                    ? 'Saved items'
                    : view === 'documents'
                      ? 'My documents'
                      : collection}
              </strong>
            </div>
            <button
              className={
                assistant ? 'sv-assistant-toggle active' : 'sv-assistant-toggle'
              }
              onClick={() => setAssistant(!assistant)}
              aria-expanded={assistant}
            >
              {assistant ? (
                <PanelRightClose size={17} />
              ) : (
                <PanelRightOpen size={17} />
              )}
              <span>Archer</span>
            </button>
          </header>
          <div className="sv-canvas" ref={contentRef}>
            {(view === 'collection' || view === 'saved') && (
              <div className="sv-page" key={collection + view}>
                <div className="sv-page-heading">
                  <div>
                    <div className="sv-kicker">YOUR RESEARCH, CONNECTED</div>
                    <h1>{view === 'saved' ? 'Saved items' : collection}</h1>
                    <p>
                      {view === 'saved'
                        ? 'A personal reading list. Bring your best sources into the next draft.'
                        : 'A focused collection of signals, context, and ideas.'}
                    </p>
                  </div>
                  <span className="sv-count">
                    <Folder size={20} />
                    {visible.length} sources
                  </span>
                </div>
                <div className="sv-research-banner">
                  <div className="sv-spark">
                    <Sparkles size={21} />
                  </div>
                  <div>
                    <strong>From reading to a point of view.</strong>
                    <p>
                      Select your sources. Let Archer build the first draft.
                    </p>
                  </div>
                  <button onClick={() => createDialog()} disabled={busy}>
                    Create document <ArrowRight size={16} />
                  </button>
                </div>
                <div className="sv-filterbar">
                  <div className="sv-segment" aria-label="Source filter">
                    {['All', 'Saved'].map((f) => (
                      <button
                        key={f}
                        aria-pressed={filter === f}
                        className={filter === f ? 'active' : ''}
                        onClick={() => setFilter(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <label className="sv-search">
                    <Search size={16} />
                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search this collection"
                      aria-label="Search this collection"
                    />
                    {search && (
                      <button
                        aria-label="Clear search"
                        onClick={() => setSearch('')}
                      >
                        <X size={14} />
                      </button>
                    )}
                  </label>
                </div>
                <div className="sv-selection">
                  <span>
                    {selected.length} source{selected.length === 1 ? '' : 's'}{' '}
                    selected
                  </span>
                  <button
                    onClick={() =>
                      setSelected(
                        visible.every((s) => selected.includes(s.id))
                          ? selected.filter(
                              (id) => !visible.some((s) => s.id === id),
                            )
                          : [
                              ...new Set([
                                ...selected,
                                ...visible.map((s) => s.id),
                              ]),
                            ],
                      )
                    }
                  >
                    {visible.length > 0 &&
                    visible.every((s) => selected.includes(s.id))
                      ? 'Deselect visible'
                      : 'Select visible'}
                  </button>
                </div>
                {visible.map((s) => (
                  <article className="sv-source" key={s.id}>
                    <input
                      type="checkbox"
                      checked={selected.includes(s.id)}
                      onChange={() =>
                        setSelected((a) =>
                          a.includes(s.id)
                            ? a.filter((id) => id !== s.id)
                            : [...a, s.id],
                        )
                      }
                      aria-label={`Select ${s.title}`}
                    />
                    <div>
                      <span className="sv-tag">{s.category}</span>
                      <button
                        className="sv-source-title"
                        onClick={() => {
                          setSource(s);
                          setModal('source');
                        }}
                      >
                        {s.title}
                      </button>
                      <p>{s.summary}</p>
                      <small>
                        {s.publisher} <span>·</span> 3 min read
                      </small>
                    </div>
                    <button
                      className={`sv-icon ${saved.includes(s.id) ? 'is-saved' : ''}`}
                      aria-label={`${saved.includes(s.id) ? 'Unsave' : 'Save'} ${s.title}`}
                      onClick={() => toggleSave(s.id)}
                    >
                      <Bookmark
                        size={19}
                        fill={saved.includes(s.id) ? 'currentColor' : 'none'}
                      />
                    </button>
                  </article>
                ))}
                {!visible.length && (
                  <div className="sv-empty">
                    <Search size={30} />
                    <h2>
                      {search ? 'No matching sources' : 'No sources here yet'}
                    </h2>
                    <p>
                      {search
                        ? 'Try a shorter search or clear the filters.'
                        : 'Explore another collection and save research to bring it here.'}
                    </p>
                    <button
                      onClick={() => {
                        if (search || filter !== 'All') {
                          setSearch('');
                          setFilter('All');
                        } else navigate('collection', 'Healthcare SaaS');
                      }}
                    >
                      {' '}
                      {search || filter !== 'All'
                        ? 'Clear filters'
                        : 'Explore healthcare research'}
                    </button>
                  </div>
                )}
                <p className="sv-footnote">
                  Illustrative research for this portfolio demo. No live data or
                  external AI connection.
                </p>
              </div>
            )}
            {view === 'documents' && (
              <div className="sv-page">
                <div className="sv-page-heading">
                  <div>
                    <div className="sv-kicker">IDEAS INTO DOCUMENTS</div>
                    <h1>My documents</h1>
                    <p>
                      {storageOK
                        ? 'Saved in this browser. Pick up where you left off.'
                        : 'Available for this session. Export your work to keep a copy.'}
                    </p>
                  </div>
                  <button
                    className="sv-primary"
                    onClick={() => createDialog()}
                    disabled={busy}
                  >
                    <Plus size={16} /> New document
                  </button>
                </div>
                {docs.length ? (
                  docs.map((d) => (
                    <button
                      key={d.id}
                      className="sv-doc-card"
                      onClick={() => openDoc(d)}
                    >
                      <span className="sv-file-icon">
                        <FileText size={25} />
                      </span>
                      <span>
                        <strong>{d.title}</strong>
                        <small>
                          {d.template} · {d.sections.length} sections ·{' '}
                          {d.revisions.length} revisions
                        </small>
                      </span>
                      <ArrowRight size={19} />
                    </button>
                  ))
                ) : (
                  <div className="sv-empty">
                    <FileText size={35} />
                    <h2>Your next idea starts here.</h2>
                    <p>Create your first draft from a research collection.</p>
                    <button
                      className="sv-primary"
                      onClick={() => createDialog()}
                    >
                      Create a document <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            )}
            {view === 'document' && doc && (
              <div className="sv-document" key={doc.id}>
                <div className="sv-doc-toolbar">
                  <button onClick={() => navigate('documents')}>
                    <ArrowLeft size={15} /> Documents
                  </button>
                  <span className="sv-save-status">
                    <Check size={14} />
                    {storageOK ? 'Saved locally' : 'Session only'}
                  </span>
                  <button onClick={() => setModal('revisions')}>
                    <History size={16} /> Revisions
                  </button>
                  <button onClick={exportDoc}>
                    <Download size={16} /> Export
                  </button>
                </div>
                <div className="sv-doc-title">
                  <span className="sv-kicker">
                    {doc.template.toUpperCase()}
                  </span>
                  <h1>{doc.title}</h1>
                  <p>Research-backed thinking. Ready for your point of view.</p>
                </div>
                <div className="sv-disclosure">
                  <Sparkles size={16} />
                  <span>
                    AI-assisted sample draft · Review assumptions and source
                    material.
                  </span>
                </div>
                <details className="sv-toc">
                  <summary>
                    Table of contents{' '}
                    <span>{doc.sections.length} sections</span>
                  </summary>
                  <div>
                    {doc.sections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() =>
                          document
                            .getElementById(
                              `${embedded ? 'embed' : 'full'}-${doc.id}-${s.id}`,
                            )
                            ?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'nearest',
                            })
                        }
                      >
                        {s.title}
                      </button>
                    ))}
                  </div>
                </details>
                {doc.sections.map((s, i) => (
                  <section
                    className="sv-doc-section"
                    id={`${embedded ? 'embed' : 'full'}-${doc.id}-${s.id}`}
                    key={s.id}
                  >
                    <div className="sv-section-head">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <h2>{s.title}</h2>
                      <button
                        aria-label={`Edit ${s.title}`}
                        onClick={() =>
                          setEdit({ id: s.id, title: s.title, body: s.body })
                        }
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        aria-label={`Remove ${s.title}`}
                        onClick={() => {
                          updateDoc(
                            revise(
                              doc,
                              doc.sections.filter((x) => x.id !== s.id),
                              `Before removing ${s.title}`,
                            ),
                          );
                          setNotice(
                            'Section removed. Restore it from Revisions.',
                          );
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {edit?.id === s.id ? (
                      <form
                        className="sv-edit"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!edit.title.trim() || !edit.body.trim()) return;
                          updateDoc(
                            revise(
                              doc,
                              doc.sections.map((x) =>
                                x.id === s.id
                                  ? {
                                      ...x,
                                      title: edit.title.trim(),
                                      body: edit.body.trim(),
                                    }
                                  : x,
                              ),
                              `Before editing ${s.title}`,
                            ),
                          );
                          setEdit(null);
                          setNotice('Changes saved.');
                        }}
                      >
                        <label>
                          Section title
                          <input
                            required
                            value={edit.title}
                            onChange={(e) =>
                              setEdit({ ...edit, title: e.target.value })
                            }
                          />
                        </label>
                        <label>
                          Content
                          <textarea
                            required
                            rows={7}
                            value={edit.body}
                            onChange={(e) =>
                              setEdit({ ...edit, body: e.target.value })
                            }
                          />
                        </label>
                        <div>
                          <button type="submit" className="sv-primary">
                            Save changes
                          </button>
                          <button type="button" onClick={() => setEdit(null)}>
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p>{s.body}</p>
                    )}
                    <div className="sv-citations">
                      {s.sourceIds.map((id) => (
                        <button
                          key={id}
                          onClick={() => {
                            setSource(sources.find((x) => x.id === id)!);
                            setModal('source');
                          }}
                        >
                          {' '}
                          <FileText size={12} /> Source {id}
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
                <button
                  className="sv-add-section"
                  onClick={() => {
                    const s = {
                      id: `s-${Date.now()}`,
                      title: 'New section',
                      body: 'Add your analysis and supporting evidence here.',
                      sourceIds: [],
                    };
                    updateDoc(
                      revise(
                        doc,
                        [...doc.sections, s],
                        'Before adding a section',
                      ),
                    );
                    setEdit({ ...s });
                  }}
                >
                  <Plus size={17} /> Add section
                </button>
                <div className="sv-document-end">
                  <Check size={20} />
                  <div>
                    <strong>Your work, ready to take forward.</strong>
                    <p>Keep refining with Archer, or export a copy.</p>
                  </div>
                  <button onClick={exportDoc}>
                    Export <Download size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        {assistant && (
          <aside className="sv-assistant" aria-label="Archer assistant">
            <header>
              <Image
                src="/images/semaverse/logo.svg"
                alt=""
                width={27}
                height={27}
                unoptimized
              />
              <div>
                <strong>Archer Assistant</strong>
                <small>
                  <i /> Ready to collaborate
                </small>
              </div>
              <button
                aria-label="Close assistant"
                onClick={() => setAssistant(false)}
              >
                <X size={17} />
              </button>
            </header>
            <div className="sv-chat" ref={chatEnd}>
              <div className="sv-chat-label">YOUR RESEARCH PARTNER</div>
              {messages.map((m, i) => (
                <div key={i} className={`sv-message sv-${m.role}`}>
                  <small>{m.role === 'archer' ? 'Archer' : 'You'}</small>
                  <p>{m.text}</p>
                </div>
              ))}
              {busy && (
                <output className="sv-job">
                  <strong>
                    <span className="sv-spinner" /> Archer is working
                  </strong>
                  {[
                    'Reading selected context',
                    'Structuring the analysis',
                    'Preparing your draft',
                  ].map((s, i) => (
                    <div key={s} className={progress >= i ? 'done' : ''}>
                      {progress > i ? (
                        <Check size={14} />
                      ) : (
                        <span className="sv-job-dot" />
                      )}
                      {s}
                    </div>
                  ))}
                  <button onClick={stop}>Stop generation</button>
                </output>
              )}
              {proposal && (
                <div className="sv-proposal">
                  <span className="sv-tag">SUGGESTED EDIT</span>
                  <h3>
                    {proposal.sections.find(
                      (s) =>
                        s.body !==
                        docs
                          .find((d) => d.id === proposal.docId)
                          ?.sections.find((x) => x.id === s.id)?.body,
                    )?.title || 'Document update'}
                  </h3>
                  <p>
                    {proposal.sections.find(
                      (s) =>
                        s.body !==
                        docs
                          .find((d) => d.id === proposal.docId)
                          ?.sections.find((x) => x.id === s.id)?.body,
                    )?.body ||
                      'This section is already concise. You can keep the current version.'}
                  </p>
                  <div>
                    <button
                      className="sv-primary"
                      onClick={() => {
                        const target = docs.find(
                          (d) => d.id === proposal.docId,
                        );
                        if (
                          target &&
                          JSON.stringify(target.sections) !== proposal.base
                        ) {
                          setProposal(null);
                          setMessages((m) => [
                            ...m,
                            {
                              role: 'archer',
                              text: 'Your document changed while this suggestion was open. I kept your latest edits. Send your request again to prepare a fresh suggestion.',
                            },
                          ]);
                          return;
                        }
                        if (target) {
                          const next = revise(
                            target,
                            proposal.sections,
                            'Before Archer’s edit',
                          );
                          updateDoc(next);
                          openDoc(next);
                        }
                        setProposal(null);
                        setNotice(
                          'Archer’s edit applied. Previous version kept in Revisions.',
                        );
                      }}
                    >
                      Apply edit <Check size={15} />
                    </button>
                    <button
                      onClick={() => {
                        setProposal(null);
                        setNotice('Suggestion discarded. Document unchanged.');
                      }}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              )}
              {!busy && !proposal && (
                <div className="sv-suggestions">
                  <span>TRY A NEXT STEP</span>
                  {view === 'document' && doc ? (
                    <>
                      <button
                        onClick={() =>
                          send('Make the executive summary concise')
                        }
                      >
                        {' '}
                        Make the executive summary concise
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => send('Expand the competitive landscape')}
                      >
                        {' '}
                        Expand the competitive landscape
                        <ArrowRight size={14} />
                      </button>
                      <button
                        onClick={() => send('Add diligence questions to risks')}
                      >
                        {' '}
                        Add diligence questions to risks
                        <ArrowRight size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => createDialog('Investment Memo')}>
                        Draft an investment memo <ArrowRight size={14} />
                      </button>
                      <button onClick={() => navigate('saved')}>
                        Review saved research <ArrowRight size={14} />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <form
              className="sv-composer"
              onSubmit={(e) => {
                e.preventDefault();
                send(prompt);
              }}
            >
              <label htmlFor={embedded ? 'embedded-prompt' : 'archer-prompt'}>
                Ask Archer
              </label>
              <textarea
                id={embedded ? 'embedded-prompt' : 'archer-prompt'}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What would you like to explore?"
                rows={3}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                    e.preventDefault();
                    send(prompt);
                  }
                }}
              />
              <button className="sv-primary" disabled={busy || !prompt.trim()}>
                <Send size={16} /> Send to Archer
              </button>
              <small>Simulated assistant · ⌘ / Ctrl + Enter to send</small>
            </form>
          </aside>
        )}
      </div>
      <output className="sv-toast" aria-live="polite">
        {notice && (
          <span>
            <Check size={16} />
            {notice}
          </span>
        )}
      </output>
      <Dialog
        open={modal !== null}
        onOpenChange={(open) => {
          if (!open) {
            setModal(null);
            setError('');
          }
        }}
      >
        <DialogContent className="sv-modal">
          <DialogTitle>
            {modal === 'create'
              ? 'Create a document'
              : modal === 'source'
                ? source.title
                : modal === 'collection'
                  ? 'New collection'
                  : modal === 'reset'
                    ? 'Reset this demo?'
                    : 'Document revisions'}
          </DialogTitle>
          <DialogDescription>
            {modal === 'create'
              ? 'Choose a template and the source material for your first draft.'
              : modal === 'source'
                ? source.publisher
                : modal === 'collection'
                  ? 'Give your research a home. Select the sources to include.'
                  : modal === 'reset'
                    ? 'This clears your demo documents, saved items, and custom collections in this browser.'
                    : 'Restore a previous version. Your current version will also be preserved.'}
          </DialogDescription>
          {modal === 'create' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                create();
              }}
            >
              <label>
                Document name
                <input
                  required
                  maxLength={100}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label>
                Template
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                >
                  {templates.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <fieldset>
                <legend>Research sources · {selected.length} selected</legend>
                {sources.map((s) => (
                  <label className="sv-check-row" key={s.id}>
                    <input
                      type="checkbox"
                      checked={selected.includes(s.id)}
                      onChange={() =>
                        setSelected((a) =>
                          a.includes(s.id)
                            ? a.filter((id) => id !== s.id)
                            : [...a, s.id],
                        )
                      }
                    />
                    <span>{s.title}</span>
                  </label>
                ))}
              </fieldset>
              {error && (
                <p role="alert" className="sv-error">
                  {error}
                </p>
              )}
              <div className="sv-modal-actions">
                <button type="button" onClick={() => setModal(null)}>
                  Cancel
                </button>
                <button className="sv-primary" disabled={busy}>
                  <Sparkles size={16} /> Generate draft
                </button>
              </div>
            </form>
          )}
          {modal === 'source' && (
            <>
              <span className="sv-tag">
                {source.category} · Illustrative research
              </span>
              <p className="sv-source-body">{source.body}</p>
              <div className="sv-modal-actions">
                <button onClick={() => toggleSave(source.id)}>
                  <Bookmark size={16} />
                  {saved.includes(source.id)
                    ? 'Remove from saved'
                    : 'Save source'}
                </button>
                <button
                  className="sv-primary"
                  onClick={() => {
                    setSelected((a) => [...new Set([...a, source.id])]);
                    setModal(null);
                    setNotice('Source added to your selection.');
                  }}
                >
                  <Plus size={16} /> Select source
                </button>
              </div>
            </>
          )}
          {modal === 'collection' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = newCollection.trim();
                if (!name) {
                  setError('Enter a collection name.');
                  return;
                }
                if (
                  collections.some(
                    (c) => c.name.toLowerCase() === name.toLowerCase(),
                  )
                ) {
                  setError('A collection with this name already exists.');
                  return;
                }
                setCollections((c) => [...c, { name, ids: selected }]);
                setCollection(name);
                setView('collection');
                setFilter('All');
                setSearch('');
                setModal(null);
                setSidebar(false);
              }}
            >
              <label>
                Collection name
                <input
                  required
                  maxLength={60}
                  value={newCollection}
                  onChange={(e) => setNewCollection(e.target.value)}
                  placeholder="e.g. Emerging technology"
                />
              </label>
              <fieldset>
                <legend>Include research</legend>
                {sources.map((s) => (
                  <label className="sv-check-row" key={s.id}>
                    <input
                      type="checkbox"
                      checked={selected.includes(s.id)}
                      onChange={() =>
                        setSelected((a) =>
                          a.includes(s.id)
                            ? a.filter((id) => id !== s.id)
                            : [...a, s.id],
                        )
                      }
                    />
                    <span>{s.title}</span>
                  </label>
                ))}
              </fieldset>
              {error && (
                <p className="sv-error" role="alert">
                  {error}
                </p>
              )}
              <div className="sv-modal-actions">
                <button type="button" onClick={() => setModal(null)}>
                  Cancel
                </button>
                <button className="sv-primary">Create collection</button>
              </div>
            </form>
          )}
          {modal === 'revisions' && doc && (
            <div>
              {doc.revisions.length ? (
                doc.revisions.map((r, i) => (
                  <div className="sv-revision" key={i}>
                    <div>
                      <strong>{r.label}</strong>
                      <small>
                        {r.sections.length} sections · Version{' '}
                        {doc.revisions.length - i}
                      </small>
                    </div>
                    <button
                      onClick={() => {
                        updateDoc(
                          revise(
                            doc,
                            r.sections,
                            'Before restoring a revision',
                          ),
                        );
                        setProposal(null);
                        setEdit(null);
                        setModal(null);
                        setNotice('Previous version restored.');
                      }}
                    >
                      Restore
                    </button>
                  </div>
                ))
              ) : (
                <div className="sv-empty">
                  <History size={26} />
                  <p>
                    Your first draft is saved. Revisions appear when you edit a
                    section or apply an Archer suggestion.
                  </p>
                  <button onClick={() => setModal(null)}>
                    Back to document
                  </button>
                </div>
              )}
            </div>
          )}
          {modal === 'reset' && (
            <div className="sv-modal-actions">
              <button onClick={() => setModal(null)}>Keep exploring</button>
              <button
                className="sv-primary"
                onClick={() => {
                  if (timer.current) clearInterval(timer.current);
                  setBusy(false);
                  setDocs([]);
                  setSaved([1, 2]);
                  setCollections(initialCollections);
                  setSelected([1, 2, 3]);
                  setCollection('Healthcare SaaS');
                  setView('collection');
                  setActive('');
                  setSearch('');
                  setFilter('All');
                  setProposal(null);
                  setMessages(welcome);
                  setPrompt('');
                  setEdit(null);
                  setModal(null);
                  setNotice('Demo reset. Ready to explore again.');
                }}
              >
                Reset demo
              </button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
