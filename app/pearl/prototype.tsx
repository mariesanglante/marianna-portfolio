'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  ArrowRight,
  Bell,
  Bookmark,
  Check,
  ChevronRight,
  Compass,
  Gift,
  Heart,
  Home,
  LockKeyhole,
  MessageCircle,
  Plus,
  Search,
  Send,
  Settings,
  Share2,
  Sparkles,
  Star,
  Users,
  Video,
  X,
} from 'lucide-react';
import './prototype.css';

type Post = {
  id: number;
  title: string;
  text: string;
  image?: string;
  tag: string;
  locked?: boolean;
};
type View =
  | 'Community'
  | 'Discover'
  | 'Saved'
  | 'Messages'
  | 'Membership'
  | 'Settings';
type Modal =
  | 'subscribe'
  | 'gift'
  | 'request'
  | 'invite'
  | 'create'
  | 'notifications'
  | null;
const posts: Post[] = [
  {
    id: 1,
    title: 'A slower kind of weekend.',
    text: 'Sometimes the best thing you can do is take the long way home. A little fresh air, a quiet lake, and absolutely no plans. What’s your favourite way to reset?',
    image: '/images/pearl/lake.png',
    tag: 'Life lately',
  },
  {
    id: 2,
    title: 'Behind the lights',
    text: 'Come backstage with me. A few moments from this week’s shoot, and the little things that never make it onto the screen.',
    image: '/images/pearl/cover.png',
    tag: 'Behind the scenes',
    locked: true,
  },
  {
    id: 3,
    title: 'Let’s make something together.',
    text: 'I’m planning our next community Q&A. Leave a question below — from life on set to finding your creative voice. I’d love to hear what’s on your mind.',
    tag: 'Community',
  },
];
const initial = {
  following: false,
  member: false,
  liked: [] as number[],
  saved: [] as number[],
  comments: {} as Record<number, string[]>,
  messages: [] as string[],
  custom: [] as Post[],
  name: 'Alex Morgan',
  notifications: true,
  gifts: [] as string[],
  requests: [] as string[],
};
type Data = typeof initial;
function Avatar({ small = false }: { small?: boolean }) {
  return (
    <Image
      unoptimized
      width={1200}
      height={800}
      className={`p-avatar ${small ? 'small' : ''}`}
      src="/images/pearl/avatar.png"
      alt="Teodor Kia"
    />
  );
}
export default function Pearl() {
  const [data, setData] = useState<Data>(initial);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>('Community');
  const [tab, setTab] = useState('All posts');
  const [search, setSearch] = useState('');
  const [modal, setModal] = useState<Modal>(null);
  const [complete, setComplete] = useState('');
  const [toast, setToast] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [detail, setDetail] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState(5);
  const [request, setRequest] = useState('Video message');
  const [draft, setDraft] = useState('');
  const [title, setTitle] = useState('');
  const [profileName, setProfileName] = useState(initial.name);

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = localStorage.getItem('pearl-prototype-v1');
        if (raw) {
          const value = JSON.parse(raw);
          if (
            value &&
            Array.isArray(value.saved) &&
            Array.isArray(value.custom)
          ) {
            setData({ ...initial, ...value });
            setProfileName(
              typeof value.name === 'string' ? value.name : initial.name,
            );
          }
        }
      } catch {}
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (ready)
      try {
        localStorage.setItem('pearl-prototype-v1', JSON.stringify(data));
      } catch {}
  }, [data, ready]);
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3500);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    function sync() {
      const views: View[] = [
        'Community',
        'Discover',
        'Saved',
        'Messages',
        'Membership',
        'Settings',
      ];
      const next = views.find(
        (v) => v.toLowerCase() === window.location.hash.slice(1),
      );
      if (next) {
        setView(next);
        setSearch('');
        setTab('All posts');
      }
    }
    queueMicrotask(sync);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const update = (patch: Partial<Data>) => setData((d) => ({ ...d, ...patch }));
  function navigate(next: View) {
    setView(next);
    window.location.hash = next.toLowerCase();
    setDetail(null);
    setSearch('');
    setTab('All posts');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function open(next: Modal) {
    setCopyStatus('');
    setComplete('');
    setDraft('');
    setTitle('');
    setModal(next);
  }
  function toggle(key: 'liked' | 'saved', id: number) {
    setData((d) => ({
      ...d,
      [key]: d[key].includes(id)
        ? d[key].filter((n) => n !== id)
        : [...d[key], id],
    }));
  }
  function copyLink() {
    const url = window.location.origin + '/pearl';
    if (!navigator.clipboard) {
      setCopyStatus('Select and copy the community link from the field.');
      return;
    }
    navigator.clipboard
      .writeText(url)
      .then(() => setCopyStatus('Community link copied'))
      .catch(() => setCopyStatus('Copy the community link from the field.'));
  }
  const allPosts = [...data.custom, ...posts];
  const visible = allPosts.filter(
    (p) =>
      (view !== 'Saved' || data.saved.includes(p.id)) &&
      (tab !== 'Members only' || p.locked) &&
      (tab !== 'Photos' || !!p.image) &&
      `${p.title} ${p.text} ${p.tag}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  function postCard(p: Post) {
    const locked = p.locked && !data.member;
    const own = data.custom.some((c) => c.id === p.id);
    return (
      <article className="p-post" key={p.id}>
        <header>
          <button
            className="p-author"
            onClick={() => {
              navigate(own ? 'Settings' : 'Community');
              if (own) setProfileName(data.name);
            }}
          >
            {own ? (
              <span className="p-initial">{data.name[0]}</span>
            ) : (
              <Avatar small />
            )}
            <span>
              <strong>
                {data.custom.some((c) => c.id === p.id)
                  ? data.name
                  : 'Teodor Kia'}{' '}
                {!own && <span className="p-verified">✓</span>}
              </strong>
              <small>
                {p.id > 3 ? 'Just now' : '2 days ago'} · {p.tag}
              </small>
            </span>
          </button>
          <button
            className={`p-icon ${data.saved.includes(p.id) ? 'selected' : ''}`}
            aria-label={
              data.saved.includes(p.id)
                ? `Unsave ${p.title}`
                : `Save ${p.title}`
            }
            onClick={() => toggle('saved', p.id)}
          >
            <Bookmark
              size={19}
              fill={data.saved.includes(p.id) ? 'currentColor' : 'none'}
            />
          </button>
        </header>
        {p.image && (
          <div className={`p-post-image ${locked ? 'locked' : ''}`}>
            <Image
              unoptimized
              width={1200}
              height={800}
              src={p.image}
              alt={
                p.id === 1
                  ? 'A quiet moment beside a forest lake'
                  : 'Colourful lights behind the scenes'
              }
            />
            {locked ? (
              <div className="p-lock">
                <LockKeyhole size={26} />
                <h3>A little more, just for members.</h3>
                <p>Go behind the scenes with Teodor.</p>
                <Button className="p-primary" onClick={() => open('subscribe')}>
                  Unlock with membership <ArrowRight size={16} />
                </Button>
                <small>$5 / month · Cancel anytime</small>
              </div>
            ) : (
              <span className="p-image-label">{p.tag}</span>
            )}
          </div>
        )}
        <div className="p-post-body">
          <h3>{p.title}</h3>
          <p>
            {locked
              ? 'Join the inner circle for exclusive posts and more personal moments.'
              : p.text}
          </p>
        </div>
        <footer>
          <button
            className={data.liked.includes(p.id) ? 'selected' : ''}
            onClick={() => toggle('liked', p.id)}
            aria-label={`Like ${p.title}`}
            aria-pressed={data.liked.includes(p.id)}
          >
            <Heart
              size={19}
              fill={data.liked.includes(p.id) ? 'currentColor' : 'none'}
            />
            {(own ? 0 : 128) + (data.liked.includes(p.id) ? 1 : 0)}
          </button>
          <button
            onClick={() => {
              if (locked) {
                open('subscribe');
                return;
              }
              setDetail(detail === p.id ? null : p.id);
              setComment('');
            }}
          >
            <MessageCircle size={19} />
            {(data.comments[p.id]?.length || 0) + (own ? 0 : 2)}
            <span> comments</span>
          </button>
          <button
            className="p-share"
            aria-label={`Share ${p.title}`}
            onClick={() => open('invite')}
          >
            <Share2 size={18} />
          </button>
        </footer>
        {detail === p.id && (
          <section className="p-comments">
            <strong>Conversation</strong>
            {!own && (
              <>
                <p>
                  <b>Emily</b> This is the reminder I needed today.
                </p>
                <p>
                  <b>Sam</b> More moments like this, please!
                </p>
              </>
            )}
            {data.comments[p.id]?.map((c, i) => (
              <p key={i}>
                <b>{data.name}</b> {c}
              </p>
            ))}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!comment.trim()) return;
                setData((d) => ({
                  ...d,
                  comments: {
                    ...d.comments,
                    [p.id]: [...(d.comments[p.id] || []), comment.trim()],
                  },
                }));
                setComment('');
              }}
            >
              <input
                aria-label="Write a comment"
                placeholder="Add to the conversation…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={500}
              />
              <button aria-label="Post comment" disabled={!comment.trim()}>
                <Send size={18} />
              </button>
            </form>
            <button className="p-text-button" onClick={() => setDetail(null)}>
              Close conversation
            </button>
          </section>
        )}
      </article>
    );
  }
  function chat(full = false) {
    return (
      <section className={`p-chat ${full ? 'full' : ''}`}>
        <header>
          <span className="p-chat-mark">
            <MessageCircle size={20} />
          </span>
          <div>
            <h3>Community chat</h3>
            <small>
              <i /> 128 people online
            </small>
          </div>
          <span className="p-live">LIVE</span>
        </header>
        <div className="p-chat-messages">
          <div className="p-date">TODAY</div>
          <div className="p-chat-line">
            <span className="p-initial lavender">E</span>
            <div>
              <b>
                Emily <small>10:42</small>
              </b>
              <p>That lake looks unreal. Where is it? 🌿</p>
            </div>
          </div>
          <div className="p-chat-line">
            <Avatar small />
            <div>
              <b>
                Teodor <span className="p-verified">✓</span>{' '}
                <small>10:44</small>
              </b>
              <p>
                A little spot just outside the city. Sharing my favourite places
                soon!
              </p>
            </div>
          </div>
          <div className="p-chat-line">
            <span className="p-initial peach">J</span>
            <div>
              <b>
                James <small>10:46</small>
              </b>
              <p>Already looking forward to the next Q&A 🙌</p>
            </div>
          </div>
          {data.messages.map((m, i) => (
            <div className="p-chat-line own" key={i}>
              <span className="p-initial">{data.name[0]}</span>
              <div>
                <b>
                  You <small>Just now</small>
                </b>
                <p>{m}</p>
                <small>Added to demo chat</small>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!message.trim()) return;
            update({ messages: [...data.messages, message.trim()] });
            setMessage('');
          }}
        >
          <input
            aria-label="Message community"
            placeholder="Say something nice…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
          />
          <button aria-label="Send message" disabled={!message.trim()}>
            <Send size={17} />
          </button>
        </form>
        <small className="p-chat-note">
          A space for good conversations. Be kind.
        </small>
      </section>
    );
  }
  return (
    <div className="pearl">
      <a className="p-skip" href="#pearl-content">
        Skip to content
      </a>
      <aside className="p-sidebar">
        <button className="p-logo" onClick={() => navigate('Community')}>
          <span className="p-pearl" />
          pearl<span className="p-logo-period">.</span>
        </button>
        <div className="p-side-caption">YOUR LITTLE CORNER</div>
        <nav>
          {(
            [
              { name: 'Community', icon: Home },
              { name: 'Discover', icon: Compass },
              { name: 'Messages', icon: MessageCircle },
              { name: 'Saved', icon: Bookmark },
            ] as const
          ).map(({ name, icon: Icon }) => (
            <button
              key={name}
              className={view === name ? 'active' : ''}
              onClick={() => navigate(name)}
            >
              <Icon size={20} />
              {name}
              {name === 'Messages' && <span className="p-count">3</span>}
            </button>
          ))}
        </nav>
        <div className="p-side-caption">YOUR COMMUNITIES</div>
        <button
          className="p-community-link"
          onClick={() => navigate('Community')}
        >
          <Avatar small />
          <span>
            Teodor Kia
            <small>
              {data.member ? 'Inner circle member' : 'Creator & storyteller'}
            </small>
          </span>
          <i />
        </button>
        <button
          className="p-discover-link"
          onClick={() => navigate('Discover')}
        >
          <Plus size={17} /> Find your people
        </button>
        <div className="p-sidebar-bottom">
          <div className="p-side-promo">
            <Sparkles size={20} />
            <h4>
              Good things happen
              <br />a little closer.
            </h4>
            <p>
              Meet the people behind
              <br />
              the things you love.
            </p>
            <button onClick={() => navigate('Discover')}>
              Explore Pearl <ArrowRight size={16} />
            </button>
          </div>
          <button
            className="p-settings"
            onClick={() => {
              navigate('Settings');
              setProfileName(data.name);
            }}
          >
            <Settings size={18} /> Settings
          </button>
          <button
            className="p-account"
            onClick={() => {
              navigate('Settings');
              setProfileName(data.name);
            }}
          >
            <span className="p-initial">{data.name[0]}</span>
            <span>
              <strong>{data.name}</strong>
              <small>Your personal space</small>
            </span>
            <ChevronRight size={16} />
          </button>
          <Link
            className="p-portfolio"
            href="/cases/pearl"
            target="_top"
            prefetch={false}
          >
            ← Back to Pearl case study
          </Link>
        </div>
      </aside>
      <div className="p-workspace">
        <header className="p-topbar">
          <div className="p-breadcrumb">
            Your communities <ChevronRight size={14} />{' '}
            <strong>{view === 'Community' ? 'Teodor Kia' : view}</strong>
          </div>
          <div className="p-top-actions">
            <label className="p-search">
              <Search size={17} />
              <input
                aria-label="Search posts"
                value={search}
                placeholder="Search this community"
                onChange={(e) => {
                  setSearch(e.target.value);
                  if (view !== 'Community' && view !== 'Saved')
                    setView('Community');
                }}
              />
              {search && (
                <button aria-label="Clear search" onClick={() => setSearch('')}>
                  <X size={14} />
                </button>
              )}
            </label>
            <button
              className="p-icon notification"
              aria-label="Notifications"
              onClick={() => open('notifications')}
            >
              <Bell size={20} />
              <i />
            </button>
            <button
              className="p-initial mini"
              aria-label="Account settings"
              onClick={() => {
                navigate('Settings');
                setProfileName(data.name);
              }}
            >
              {data.name[0]}
            </button>
          </div>
        </header>
        <main id="pearl-content" className="p-main">
          <div className="p-page-heading">
            <div>
              <span className="p-kicker">A LITTLE CLOSER</span>
              <h1>
                {view === 'Community'
                  ? 'Your people. Your place.'
                  : view === 'Saved'
                    ? 'Worth coming back to.'
                    : view === 'Discover'
                      ? 'Find your kind of people.'
                      : view === 'Messages'
                        ? 'Keep the conversation going.'
                        : view === 'Membership'
                          ? 'Your inner circle.'
                          : 'Make yourself at home.'}
              </h1>
            </div>
            <span className="p-demo">Interactive demo</span>
          </div>
          {view === 'Community' || view === 'Saved' ? (
            <>
              <section className="p-profile">
                <div className="p-cover">
                  <Image
                    unoptimized
                    width={1200}
                    height={800}
                    src="/images/pearl/cover.png"
                    alt="An installation of vibrant blue and yellow neon lights"
                  />
                  <span>THE WORLD THROUGH A DIFFERENT LENS</span>
                  <button
                    aria-label="Share community"
                    onClick={() => open('invite')}
                  >
                    <Share2 size={18} />
                  </button>
                </div>
                <div className="p-profile-info">
                  <Avatar />
                  <div className="p-profile-name">
                    <h2>
                      Teodor Kia <span className="p-verified">✓</span>
                    </h2>
                    <span>@teodorkia</span>
                    <p>
                      TV presenter. Storyteller. Finding beauty in the everyday.
                    </p>
                    <div className="p-stats">
                      <span>
                        <b>388k</b> followers
                      </span>
                      <span>
                        <b>1.1m</b> subscribers
                      </span>
                      <span className="p-online">
                        <i /> Creating, connecting, sharing
                      </span>
                    </div>
                  </div>
                  <div className="p-profile-actions">
                    <Button
                      className={data.following ? 'p-secondary' : 'p-primary'}
                      onClick={() => update({ following: !data.following })}
                    >
                      {data.following ? (
                        <Check size={17} />
                      ) : (
                        <Plus size={17} />
                      )}{' '}
                      {data.following ? 'Following' : 'Follow for free'}
                    </Button>
                    <Button
                      className="p-secondary"
                      onClick={() => open('request')}
                    >
                      <Video size={17} /> Get in touch
                    </Button>
                  </div>
                </div>
              </section>
              <div className="p-columns">
                <section className="p-feed">
                  <div className="p-feed-title">
                    <div
                      className="p-tabs"
                      role="tablist"
                      aria-label="Post filters"
                    >
                      {(view === 'Saved'
                        ? ['Saved posts']
                        : ['All posts', 'Photos', 'Members only']
                      ).map((t) => (
                        <button
                          role="tab"
                          aria-selected={view === 'Saved' || tab === t}
                          className={
                            view === 'Saved' || tab === t ? 'active' : ''
                          }
                          key={t}
                          onClick={() => setTab(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                    <button
                      className="p-icon"
                      aria-label="Create a community post"
                      onClick={() => open('create')}
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  {search && (
                    <p className="p-result-count">
                      {visible.length} results for “{search}”
                    </p>
                  )}
                  {visible.length ? (
                    visible.map(postCard)
                  ) : (
                    <div className="p-empty">
                      <Bookmark size={30} />
                      <h3>
                        {search
                          ? 'No posts found.'
                          : 'A space for your favourites.'}
                      </h3>
                      <p>
                        {search
                          ? 'Try another word or clear your search.'
                          : 'Save a post and it will be waiting for you here.'}
                      </p>
                      <Button
                        className="p-primary"
                        onClick={() => {
                          setSearch('');
                          navigate('Community');
                        }}
                      >
                        Back to all posts
                      </Button>
                    </div>
                  )}
                  <div className="p-feed-end">
                    You’re all caught up <span>✦</span>
                    <button onClick={() => open('create')}>
                      Start a conversation
                    </button>
                  </div>
                </section>
                <aside className="p-right">
                  <section className="p-membership-card">
                    <span className="p-star-disc">
                      <Star size={23} />
                    </span>
                    <span className="p-kicker">
                      {data.member ? 'YOU’RE IN' : 'THE INNER CIRCLE'}
                    </span>
                    <h2>
                      {data.member
                        ? 'A little closer, together.'
                        : 'More than a follow.'}
                    </h2>
                    <p>
                      {data.member
                        ? 'Your membership is active. Enjoy every little extra.'
                        : 'Go behind the scenes. Get exclusive moments. Be part of something closer.'}
                    </p>
                    <div>
                      <Check size={15} /> Exclusive posts & updates
                    </div>
                    <div>
                      <Check size={15} /> Members-only conversations
                    </div>
                    <Button
                      className="p-primary"
                      onClick={() =>
                        data.member ? navigate('Membership') : open('subscribe')
                      }
                    >
                      {data.member
                        ? 'Manage membership'
                        : 'Join the inner circle'}
                      <ArrowRight size={17} />
                    </Button>
                    <small>
                      {data.member
                        ? 'Demo membership · $5 / month'
                        : '$5 / month · Cancel anytime'}
                    </small>
                  </section>
                  {chat()}
                  <section className="p-support">
                    <span className="p-gift-disc">
                      <Gift size={20} />
                    </span>
                    <div>
                      <h3>A little appreciation</h3>
                      <p>Make Teodor’s day with a gift.</p>
                    </div>
                    <button
                      className="p-icon"
                      aria-label="Send a gift"
                      onClick={() => open('gift')}
                    >
                      <ArrowRight size={19} />
                    </button>
                  </section>
                  <button className="p-invite" onClick={() => open('invite')}>
                    <Users size={17} /> Better with friends{' '}
                    <ArrowRight size={16} />
                  </button>
                </aside>
              </div>
            </>
          ) : view === 'Messages' ? (
            <div className="p-message-page">
              {chat(true)}
              <section className="p-panel">
                <h2>Something more personal?</h2>
                <p>Request a personalised video message from Teodor.</p>
                <Button className="p-primary" onClick={() => open('request')}>
                  Make a request
                </Button>
                <h3>Your requests</h3>
                {data.requests.length ? (
                  data.requests.map((r, i) => (
                    <p key={i}>
                      {r}
                      <small className="p-block">
                        Demo request recorded · No message sent
                      </small>
                    </p>
                  ))
                ) : (
                  <p>
                    No requests yet. You can explore the options before
                    deciding.
                  </p>
                )}
              </section>
            </div>
          ) : view === 'Discover' ? (
            <section className="p-discovery">
              <div className="p-discovery-intro">
                <span className="p-kicker">FEATURED COMMUNITY</span>
                <h2>
                  A new perspective
                  <br />
                  is a conversation away.
                </h2>
                <p>
                  Join Teodor for everyday inspiration, stories from behind the
                  scenes, and a community that gets you.
                </p>
                <Button
                  className="p-primary"
                  onClick={() => navigate('Community')}
                >
                  Explore Teodor’s community <ArrowRight size={18} />
                </Button>
              </div>
              <Image
                unoptimized
                width={1200}
                height={800}
                src="/images/pearl/lake.png"
                alt="A traveller looking out over a peaceful lake"
              />
            </section>
          ) : view === 'Membership' ? (
            <section className="p-panel p-manage">
              <Star size={30} />
              <h2>
                {data.member
                  ? 'Teodor’s inner circle'
                  : 'Your next chapter starts here.'}
              </h2>
              <p>
                {data.member
                  ? 'Active demo membership · $5 per month. No payment has been collected.'
                  : 'Get exclusive posts and a closer connection with Teodor.'}
              </p>
              <Button
                className="p-primary"
                onClick={() =>
                  data.member ? navigate('Community') : open('subscribe')
                }
              >
                {data.member ? 'Explore member posts' : 'Explore membership'}
              </Button>
              {data.member && (
                <Button
                  className="p-secondary"
                  onClick={() => {
                    update({ member: false });
                    setToast('Membership cancelled. You can rejoin anytime.');
                  }}
                >
                  Cancel demo membership
                </Button>
              )}
            </section>
          ) : (
            <section className="p-panel p-manage">
              <h2>Your profile</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!profileName.trim()) return;
                  update({ name: profileName.trim() });
                  setToast('Profile updated');
                }}
              >
                <label>
                  Display name
                  <input
                    required
                    maxLength={40}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                </label>
                <Button
                  className="p-primary"
                  type="submit"
                  disabled={!profileName.trim()}
                >
                  Save changes
                </Button>
              </form>
              <label className="p-toggle" aria-label="Community notifications">
                <span>
                  <strong>Community notifications</strong>
                  <small>Show updates in your demo notification inbox.</small>
                </span>
                <input
                  type="checkbox"
                  checked={data.notifications}
                  onChange={(e) => update({ notifications: e.target.checked })}
                />
              </label>
              <button
                className="p-text-button"
                onClick={() => navigate('Membership')}
              >
                Manage membership <ArrowRight size={16} />
              </button>
            </section>
          )}
          <footer className="p-page-footer">
            <span>
              pearl. <span>A little closer to what you love.</span>
            </span>
            <button onClick={() => navigate('Discover')}>
              Explore the community <ArrowRight size={14} />
            </button>
          </footer>
        </main>
      </div>
      <Dialog
        open={modal !== null}
        onOpenChange={(value) => {
          if (!value) setModal(null);
        }}
      >
        <DialogContent className="p-modal">
          <DialogTitle>
            {complete
              ? 'All set.'
              : modal === 'subscribe'
                ? 'Welcome to the inner circle.'
                : modal === 'gift'
                  ? 'Send a little appreciation.'
                  : modal === 'request'
                    ? 'Make it personal.'
                    : modal === 'invite'
                      ? 'Good company deserves company.'
                      : modal === 'create'
                        ? 'Start a conversation.'
                        : 'Your updates'}
          </DialogTitle>
          <DialogDescription>
            {complete ||
              (modal === 'subscribe'
                ? 'Get closer to Teodor’s world with a monthly membership.'
                : modal === 'gift'
                  ? 'Choose a gift amount and leave a little note.'
                  : modal === 'request'
                    ? 'Request a personal video message. Review the details before confirming.'
                    : modal === 'invite'
                      ? 'Share Teodor’s community with someone who would love it.'
                      : modal === 'create'
                        ? 'Share a thought, a question, or a little inspiration.'
                        : 'The latest from your Pearl community.')}
          </DialogDescription>
          {complete ? (
            <div className="p-complete">
              <span>
                <Check size={30} />
              </span>
              <p>Your demo changes are saved on this device.</p>
              <Button
                className="p-primary"
                onClick={() => {
                  setModal(null);
                  navigate('Community');
                }}
              >
                Back to the community <ArrowRight size={17} />
              </Button>
            </div>
          ) : modal === 'subscribe' ? (
            <>
              <div className="p-checkout">
                <Avatar />
                <div>
                  <strong>Teodor Kia</strong>
                  <small>Inner circle membership</small>
                </div>
                <b>
                  $5<small>/ month</small>
                </b>
              </div>
              <ul className="p-benefits">
                <li>Exclusive posts and behind-the-scenes moments</li>
                <li>Members-only conversations</li>
                <li>Cancel anytime in your membership settings</li>
              </ul>
              <div className="p-demo-note">
                Demo checkout — no payment details needed and no charge.
              </div>
              <Button
                className="p-primary"
                onClick={() => {
                  update({ member: true, following: true });
                  setComplete('You’re in! Exclusive posts are now unlocked.');
                }}
              >
                Activate demo membership · $5 / month
              </Button>
            </>
          ) : modal === 'gift' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                update({
                  gifts: [
                    ...data.gifts,
                    `$${amount}${draft.trim() ? ' — ' + draft.trim() : ''}`,
                  ],
                });
                setComplete(
                  `Your $${amount} demo gift is recorded. No payment was collected or gift sent.`,
                );
              }}
            >
              <div className="p-amounts">
                {[5, 10, 25, 50].map((n) => (
                  <button
                    type="button"
                    className={amount === n ? 'active' : ''}
                    aria-pressed={amount === n}
                    key={n}
                    onClick={() => setAmount(n)}
                  >
                    ${n}
                  </button>
                ))}
              </div>
              <label>
                A note for Teodor <span>(optional)</span>
                <textarea
                  maxLength={280}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Thanks for the inspiration!"
                />
              </label>
              <div className="p-demo-note">
                Demo gift — no real payment or delivery.
              </div>
              <Button type="submit" className="p-primary">
                Confirm demo gift · ${amount}
              </Button>
            </form>
          ) : modal === 'request' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!draft.trim()) return;
                update({
                  requests: [...data.requests, `${request}: ${draft.trim()}`],
                });
                setComplete(
                  'Your demo request is recorded. You can find it in Messages.',
                );
              }}
            >
              <label>
                Request type
                <select
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                >
                  <option>Video message</option>
                  <option>Community Q&A question</option>
                </select>
              </label>
              <label>
                {request === 'Video message'
                  ? 'Who is it for, and what’s the occasion?'
                  : 'What would you like to ask?'}
                <textarea
                  required
                  maxLength={500}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Tell Teodor a little more…"
                />
              </label>
              <div className="p-demo-note">
                {request === 'Video message'
                  ? 'Up to 1 minute · $50 demo total'
                  : 'Free community question'}{' '}
                · No real charge or request sent.
              </div>
              <Button
                type="submit"
                className="p-primary"
                disabled={!draft.trim()}
              >
                Confirm demo request <ArrowRight size={17} />
              </Button>
            </form>
          ) : modal === 'invite' ? (
            <>
              <label>
                Community link
                <input
                  readOnly
                  value={
                    typeof window === 'undefined'
                      ? ''
                      : window.location.origin + '/pearl'
                  }
                  onFocus={(e) => e.target.select()}
                />
              </label>
              <Button className="p-primary" onClick={copyLink}>
                <Share2 size={17} /> Copy community link
              </Button>
              {copyStatus && (
                <output className="p-copy-status">{copyStatus}</output>
              )}
              <p className="p-demo-note">
                Share this community link with someone who would enjoy it.
              </p>
            </>
          ) : modal === 'create' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!title.trim() || !draft.trim()) return;
                update({
                  custom: [
                    {
                      id: Date.now(),
                      title: title.trim(),
                      text: draft.trim(),
                      tag: 'Community',
                    },
                    ...data.custom,
                  ],
                });
                setComplete('Your post is now in the community feed.');
                setTab('All posts');
                setSearch('');
              }}
            >
              <label>
                Title
                <input
                  required
                  maxLength={100}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What’s on your mind?"
                />
              </label>
              <label>
                Your post
                <textarea
                  required
                  maxLength={2000}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Share with the community…"
                />
              </label>
              <Button
                type="submit"
                className="p-primary"
                disabled={!title.trim() || !draft.trim()}
              >
                Publish demo post <Send size={17} />
              </Button>
            </form>
          ) : (
            <>
              <div className="p-notification-item">
                <Bell size={22} />
                <div>
                  <strong>
                    {data.notifications
                      ? 'You’re invited to the conversation'
                      : 'Notifications are paused'}
                  </strong>
                  <p>
                    {data.notifications
                      ? 'Teodor is collecting questions for the next community Q&A.'
                      : 'Turn them on in Settings to see community updates.'}
                  </p>
                </div>
              </div>
              <Button
                className="p-primary"
                onClick={() => {
                  setModal(null);
                  if (data.notifications) {
                    navigate('Community');
                    setDetail(3);
                    setTimeout(
                      () =>
                        document.querySelector('.p-comments')?.scrollIntoView({
                          block: 'center',
                          behavior: window.matchMedia(
                            '(prefers-reduced-motion: reduce)',
                          ).matches
                            ? 'instant'
                            : 'smooth',
                        }),
                      100,
                    );
                  } else {
                    navigate('Settings');
                    setProfileName(data.name);
                  }
                }}
              >
                {data.notifications ? 'Join the conversation' : 'Open settings'}
              </Button>
            </>
          )}
          {!complete && (
            <button
              className="p-text-button p-modal-cancel"
              onClick={() => setModal(null)}
            >
              Not now — back to exploring
            </button>
          )}
        </DialogContent>
      </Dialog>
      {toast && (
        <output className="p-toast">
          <Check size={17} />
          {toast}
          <button
            aria-label="Dismiss notification"
            onClick={() => setToast('')}
          >
            <X size={15} />
          </button>
        </output>
      )}
    </div>
  );
}
