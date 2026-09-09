'use client';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Heart,
  Home,
  MessageCircle,
  Pause,
  Play,
  Plus,
  Search,
  Settings,
  Share2,
  User,
  Wallet,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  Bookmark,
  Film,
  CheckCircle2,
} from 'lucide-react';
import './coinflix-demo.css';

type View =
  | 'home'
  | 'search'
  | 'watch'
  | 'episodes'
  | 'comments'
  | 'creator'
  | 'create'
  | 'details'
  | 'review'
  | 'published'
  | 'wallet'
  | 'support'
  | 'supported'
  | 'profile'
  | 'edit'
  | 'settings'
  | 'signin'
  | 'recovery';
type PublishedStory = {
  id: number;
  title: string;
  description: string;
  format: string;
  series: string;
  creator: string;
};
const shows = [
  {
    id: 0,
    title: 'After Hours',
    creator: 'Alex Morgan',
    tag: 'City stories',
    description:
      'Small moments, big-city energy. A three-part love letter to the streets after sunset.',
    image: 'create',
    episodes: ['The city wakes up', 'A different way home', 'Until tomorrow'],
  },
  {
    id: 1,
    title: 'Shape of a Feeling',
    creator: 'Maya Chen',
    tag: 'Art & design',
    description:
      'Color, movement, and a little imagination. An exploration of the things we feel but can’t quite name.',
    image: 'watch',
    episodes: ['Soft beginnings', 'In full color', 'Coming together'],
  },
  {
    id: 2,
    title: 'Little Escapes',
    creator: 'Sam Rivera',
    tag: 'Everyday adventures',
    description:
      'A fresh perspective is closer than you think. Three small escapes from the everyday.',
    image: 'home',
    episodes: ['Take the long way', 'Somewhere new', 'Back with a story'],
  },
];
const labels: Record<View, string> = {
  home: 'Discover',
  search: 'Search',
  watch: 'Now playing',
  episodes: 'Episodes',
  comments: 'Conversation',
  creator: 'Creator',
  create: 'Create a story',
  details: 'Video details',
  review: 'Review & publish',
  published: 'Published',
  wallet: 'Your wallet',
  support: 'Support a creator',
  supported: 'Support sent',
  profile: 'Your profile',
  edit: 'Edit profile',
  settings: 'Settings',
  signin: 'Welcome back',
  recovery: 'Account recovery',
};
export function CoinflixDemo() {
  const [view, setView] = useState<View>('home');
  const [history, setHistory] = useState<View[]>([]);
  const [showId, setShowId] = useState(0);
  const [episode, setEpisode] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState<number[]>([]);
  const [saved, setSaved] = useState<number[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [comments, setComments] = useState<Record<number, string[]>>({});
  const [comment, setComment] = useState('');
  const [notice, setNotice] = useState('');
  const [title, setTitle] = useState('A different way home');
  const [description, setDescription] = useState(
    'The best stories happen when you take a little detour.',
  );
  const [format, setFormat] = useState('Single video');
  const [series, setSeries] = useState('After Hours');
  const [clip, setClip] = useState(false);
  const [published, setPublished] = useState<PublishedStory[]>([]);
  const [ownStory, setOwnStory] = useState<PublishedStory | null>(null);
  const [draftId, setDraftId] = useState(0);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState(120);
  const [amount, setAmount] = useState('10');
  const [transactions, setTransactions] = useState<
    { creator: string; amount: number }[]
  >([]);
  const [name, setName] = useState('Jamie Lee');
  const [bio, setBio] = useState('Finding stories in the everyday.');
  const [draftName, setDraftName] = useState(name);
  const [draftBio, setDraftBio] = useState(bio);
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [error, setError] = useState('');
  const [tour, setTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const show = shows[showId];
  function go(next: View) {
    setTour(false);
    setHistory((h) => [...h, view]);
    setView(next);
    setError('');
    setPlaying(false);
  }
  function root(next: View) {
    setTour(false);
    if (next === 'create' && published.some((story) => story.id === draftId)) {
      setDraftId((id) => id + 1);
      setClip(false);
      setTitle('');
      setDescription('');
      setFormat('Single video');
      setSeries('After Hours');
    }
    setHistory([]);
    setView(next);
    setError('');
    setPlaying(false);
  }
  function back() {
    setTour(false);
    const next = [...history];
    setView(next.pop() || 'home');
    setHistory(next);
    setError('');
    setPlaying(false);
  }
  function choose(id: number) {
    setOwnStory(null);
    setShowId(id);
    setEpisode(0);
    setProgress(0);
    go('watch');
    setPlaying(true);
  }
  function editDraft() {
    if (published.some((story) => story.id === draftId))
      setDraftId((id) => id + 1);
    setError('');
  }
  function publishStory(destination: 'published' | 'profile') {
    if (
      !clip ||
      !title.trim() ||
      (format !== 'Single video' && !series.trim())
    ) {
      go(!clip ? 'create' : 'details');
      setError(
        !clip
          ? 'Select a sample clip before publishing.'
          : 'Add a video title and series name before publishing.',
      );
      return;
    }
    const story = {
      id: draftId,
      title: title.trim(),
      description: description.trim(),
      format,
      series: format === 'Single video' ? '' : series.trim(),
      creator: name,
    };
    setPublished((items) =>
      items.some((item) => item.id === draftId) ? items : [story, ...items],
    );
    if (destination === 'profile') root('profile');
    else go('published');
  }
  function stopTour() {
    setTour(false);
  }
  function toast(message: string) {
    setNotice(message);
  }
  function toggle(id: number, values: number[], setter: (v: number[]) => void) {
    setter(
      values.includes(id) ? values.filter((x) => x !== id) : [...values, id],
    );
  }
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    container.current?.scrollTo({ top: 0 });
    heading.current?.focus({ preventScroll: true });
  }, [view]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 3600);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    if (view !== 'watch' || !playing) return;
    const timer = setTimeout(() => {
      if (progress >= 98) {
        if (autoplay && !ownStory && episode < 2) {
          setEpisode(episode + 1);
          setProgress(0);
        } else {
          setProgress(100);
          setPlaying(false);
        }
      } else setProgress(progress + 2);
    }, 400);
    return () => clearTimeout(timer);
  }, [view, playing, progress, autoplay, episode, ownStory]);
  function showTourFrame(index: number) {
    const frames: View[] = [
      'home',
      'watch',
      'episodes',
      'creator',
      'create',
      'details',
      'review',
      'published',
      'wallet',
    ];
    setTourStep(index);
    setView(frames[index]);
    setHistory([]);
    setShowId(0);
    setOwnStory(null);
    setPlaying(index === 1);
    if (index === 1) setProgress(0);
    if (index === 8) {
      setTour(false);
      setNotice('Tour complete. Explore any flow yourself.');
    }
  }
  useEffect(() => {
    if (!tour) return;
    const timer = setTimeout(() => showTourFrame(tourStep + 1), 3400);
    return () => clearTimeout(timer);
  }, [tour, tourStep]);
  function launch(next: View) {
    setTour(false);
    root(next);
  }
  function reset() {
    setTour(false);
    root('home');
    setShowId(0);
    setEpisode(0);
    setProgress(0);
    setLiked([]);
    setSaved([]);
    setFollowing([]);
    setQuery('');
    setComments({});
    setComment('');
    setClip(false);
    setTitle('A different way home');
    setDescription('The best stories happen when you take a little detour.');
    setFormat('Single video');
    setSeries('After Hours');
    setPublished([]);
    setDraftId(0);
    setOwnStory(null);
    setDraftName('Jamie Lee');
    setDraftBio('Finding stories in the everyday.');
    setMuted(true);
    setTourStep(0);
    setConnected(false);
    setBalance(120);
    setTransactions([]);
    setName('Jamie Lee');
    setBio('Finding stories in the everyday.');
    setSignedIn(false);
    setNotifications(true);
    setAutoplay(false);
    setAmount('10');
    toast('Demo reset. A fresh story starts here.');
  }
  const primary = (text: string, action: () => void, disabled = false) => (
    <button
      type="button"
      className="cd-primary"
      onClick={action}
      disabled={disabled}
    >
      {text}
      <ChevronRight size={17} />
    </button>
  );
  const card = (id: number) => {
    const item = shows[id];
    return (
      <button
        type="button"
        className="cd-story"
        aria-label={`Watch ${item.title}`}
        onClick={() => choose(id)}
        key={id}
      >
        <span className={`cd-thumbnail cd-thumb-${item.image}`}>
          <span className="cd-pill">
            <Play size={12} /> 3 episodes
          </span>
          <span className="cd-card-play">
            <Play size={22} fill="currentColor" />
          </span>
        </span>
        <span className="cd-story-meta">
          <strong>{item.title}</strong>
          <span>
            {item.creator} · {item.tag}
          </span>
        </span>
      </button>
    );
  };
  return (
    <div id="coinflix-prototype" className="cd-demo">
      <div className="cd-guide">
        <p className="cf-kicker">PLAYABLE PRODUCT / RIGHT HERE</p>
        <h3>
          Your next
          <br />
          <em>main-character moment.</em>
        </h3>
        <p>
          Take a story from discovery to your next episode. Publish one of your
          own. Or send a little appreciation to a creator.
        </p>
        <fieldset className="cd-flow-picker">
          <legend>Choose a starting point</legend>
          {(
            [
              { label: 'Watch & discover', view: 'home', icon: Play },
              { label: 'Create & publish', view: 'create', icon: Plus },
              { label: 'Wallet & support', view: 'wallet', icon: Wallet },
              { label: 'Profile & settings', view: 'profile', icon: User },
            ] as const
          ).map((item) => (
            <button
              type="button"
              key={item.view}
              onClick={() => launch(item.view)}
            >
              <item.icon size={18} />
              {item.label}
              <ChevronRight size={16} />
            </button>
          ))}
        </fieldset>
        <div className="cd-guide-actions">
          <button
            type="button"
            onClick={() => {
              if (tour) {
                setTour(false);
                setPlaying(false);
              } else {
                showTourFrame(0);
                setTour(true);
              }
            }}
          >
            {tour ? <Pause size={16} /> : <Play size={16} />}{' '}
            {tour ? 'Pause walkthrough' : 'Watch a quick walkthrough'}
          </button>
          <button type="button" onClick={reset}>
            <RotateCcw size={16} />
            Reset demo
          </button>
        </div>
        <p className="cd-disclosure">
          Interactive concept with sample stories and simulated playback.
          Publishing, accounts, and credits stay in this demo. No camera,
          payment, or wallet connection required.
        </p>
      </div>
      <div className="cd-device-wrap">
        <div className="cd-device" aria-label="Coinflix interactive demo">
          <div className="cd-status">
            <span>9:41</span>
            <span>
              COINFLIX <span aria-hidden="true">● ▰</span>
            </span>
          </div>
          <header className="cd-header">
            <button
              type="button"
              aria-label={view === 'home' ? 'Go to your profile' : 'Go back'}
              onClick={() => {
                setTour(false);
                if (view === 'home') go('profile');
                else back();
              }}
            >
              {view === 'home' ? <User size={20} /> : <ArrowLeft size={20} />}
            </button>
            <h4 ref={heading} tabIndex={-1}>
              {labels[view]}
            </h4>
            <button
              type="button"
              aria-label="Return to discovery"
              onClick={() => launch('home')}
            >
              <X size={19} />
            </button>
          </header>
          {tour && (
            <div className="cd-tour-banner">
              <span>Guided walkthrough · {tourStep + 1}/9</span>
              <button
                type="button"
                onClick={() => {
                  setTour(false);
                  setPlaying(false);
                }}
              >
                Take control
              </button>
            </div>
          )}
          <div
            className="cd-content"
            ref={container}
            onClickCapture={stopTour}
            onKeyDownCapture={stopTour}
            onInputCapture={stopTour}
          >
            {view === 'home' && (
              <>
                <div className="cd-heading">
                  <span className="cd-eyebrow">STORIES WORTH YOUR TIME</span>
                  <h5>
                    Small shows.
                    <br />
                    Big feelings.
                  </h5>
                  <p>Find your next favorite creator.</p>
                </div>
                <button
                  type="button"
                  className="cd-search-link"
                  onClick={() => go('search')}
                >
                  <Search size={17} />
                  Search stories and creators
                </button>
                <div className="cd-row-heading">
                  <h6>For you</h6>
                  <span>3 microshows</span>
                </div>
                {shows.map((s) => card(s.id))}
                {saved.length > 0 && (
                  <>
                    <div className="cd-row-heading">
                      <h6>Your watchlist</h6>
                      <span>{saved.length} saved</span>
                    </div>
                    {saved.map(card)}
                  </>
                )}
              </>
            )}
            {view === 'search' && (
              <>
                <label className="cd-label">
                  Find something good
                  <div className="cd-search-input">
                    <Search size={17} />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Title, creator, or mood"
                      type="search"
                    />
                    {query && (
                      <button
                        type="button"
                        aria-label="Clear search"
                        onClick={() => setQuery('')}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </label>
                <p className="cd-small">Try “city”, “Maya”, or “art”.</p>
                {shows
                  .filter((s) =>
                    `${s.title} ${s.creator} ${s.tag}`
                      .toLowerCase()
                      .includes(query.toLowerCase().trim()),
                  )
                  .map((s) => card(s.id))}
                {!shows.some((s) =>
                  `${s.title} ${s.creator} ${s.tag}`
                    .toLowerCase()
                    .includes(query.toLowerCase().trim()),
                ) && (
                  <div className="cd-empty">
                    <Search />
                    <h5>No stories found</h5>
                    <p>Try another title, creator, or mood.</p>
                    {primary('Show all stories', () => setQuery(''))}
                  </div>
                )}
              </>
            )}
            {view === 'watch' && (
              <>
                <div
                  className={`cd-player cd-thumb-${show.image} ${playing ? 'is-playing' : ''}`}
                >
                  <div className="cd-player-shade" />
                  <span className="cd-pill">
                    EPISODE {episode + 1} / 3 · DEMO
                  </span>
                  <button
                    type="button"
                    className="cd-player-toggle"
                    aria-label={
                      playing
                        ? 'Pause episode'
                        : progress === 100
                          ? 'Replay episode'
                          : 'Play episode'
                    }
                    onClick={() => {
                      if (progress === 100) setProgress(0);
                      setPlaying(!playing);
                    }}
                  >
                    {playing ? (
                      <Pause size={30} fill="currentColor" />
                    ) : (
                      <Play size={30} fill="currentColor" />
                    )}
                  </button>
                  <div className="cd-player-caption">
                    <span>{ownStory ? ownStory.creator : show.title}</span>
                    <strong>{ownStory?.title || show.episodes[episode]}</strong>
                    <p>
                      {playing
                        ? 'A moment. A new perspective. A story worth sharing.'
                        : progress === 100
                          ? 'That’s a wrap. What’s next?'
                          : 'Press play. Stay for the story.'}
                    </p>
                  </div>
                  <div className="cd-playback">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={progress}
                      aria-label="Episode progress"
                      onChange={(e) => setProgress(Number(e.target.value))}
                    />
                    <div>
                      <span>
                        {Math.floor(progress / 5)
                          .toString()
                          .padStart(2, '0')}{' '}
                        / 20s preview
                      </span>
                      <button
                        type="button"
                        aria-label={
                          muted
                            ? 'Enable sound indicator'
                            : 'Mute sound indicator'
                        }
                        onClick={() => {
                          setMuted(!muted);
                          toast('This animated preview has no audio track.');
                        }}
                      >
                        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                  </div>
                </div>
                {!ownStory && (
                  <>
                    <div className="cd-social">
                      <button
                        type="button"
                        aria-pressed={liked.includes(showId)}
                        onClick={() => toggle(showId, liked, setLiked)}
                      >
                        <Heart
                          size={20}
                          fill={
                            liked.includes(showId) ? 'currentColor' : 'none'
                          }
                        />
                        {liked.includes(showId) ? '129' : '128'}
                      </button>
                      <button type="button" onClick={() => go('comments')}>
                        <MessageCircle size={20} />
                        {2 + (comments[showId]?.length || 0)}
                      </button>
                      <button
                        type="button"
                        aria-pressed={saved.includes(showId)}
                        onClick={() => {
                          toggle(showId, saved, setSaved);
                          toast(
                            saved.includes(showId)
                              ? 'Removed from your watchlist.'
                              : 'Saved to your watchlist on Discover.',
                          );
                        }}
                      >
                        <Bookmark
                          size={20}
                          fill={
                            saved.includes(showId) ? 'currentColor' : 'none'
                          }
                        />
                        {saved.includes(showId) ? 'Saved' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              `${window.location.origin}/cases/coinflix#coinflix-prototype`,
                            );
                            toast('Link copied. Share this Coinflix demo.');
                          } catch {
                            toast('Copy the page address to share this demo.');
                          }
                        }}
                      >
                        <Share2 size={20} />
                        Share
                      </button>
                    </div>
                    <button
                      type="button"
                      className="cd-person"
                      onClick={() => go('creator')}
                    >
                      <span className="cd-avatar">{show.creator[0]}</span>
                      <span>
                        <strong>{show.creator}</strong>
                        <small>Meet the creator</small>
                      </span>
                      <ChevronRight size={18} />
                    </button>
                    <p>{show.description}</p>
                  </>
                )}
                {ownStory && (
                  <div className="cd-own-story-details">
                    <p>{ownStory.description || 'No description added.'}</p>
                    <p className="cd-small">
                      {ownStory.format}
                      {ownStory.series ? ` · ${ownStory.series}` : ''}
                    </p>
                  </div>
                )}
                {progress === 100 && (
                  <div className="cd-inline-success">
                    <Check size={16} />
                    Episode complete
                  </div>
                )}
                {ownStory
                  ? primary('Back to my stories', () => root('profile'))
                  : primary(
                      episode < 2 ? 'Next episode' : 'Watch the series again',
                      () => {
                        setEpisode(episode < 2 ? episode + 1 : 0);
                        setProgress(0);
                        setPlaying(true);
                      },
                    )}
                {!ownStory && (
                  <button
                    type="button"
                    className="cd-secondary"
                    onClick={() => go('episodes')}
                  >
                    View all 3 episodes
                  </button>
                )}
              </>
            )}
            {view === 'episodes' && (
              <>
                <div className="cd-heading">
                  <span className="cd-eyebrow">MICROSHOW · 3 EPISODES</span>
                  <h5>{show.title}</h5>
                  <p>{show.description}</p>
                </div>
                {show.episodes.map((ep, i) => (
                  <button
                    type="button"
                    className="cd-list-item"
                    key={ep}
                    onClick={() => {
                      setEpisode(i);
                      setProgress(0);
                      go('watch');
                      setPlaying(true);
                    }}
                  >
                    <span className="cd-episode-number">0{i + 1}</span>
                    <span>
                      <strong>{ep}</strong>
                      <small>20-second interactive preview</small>
                    </span>
                    <Play size={18} />
                  </button>
                ))}
                {primary('Discover another show', () => root('home'))}
              </>
            )}
            {view === 'comments' && (
              <>
                <p className="cd-small">
                  {show.title} · Episode {episode + 1}
                </p>
                {[
                  'This deserves a whole series. ✨',
                  'The little details make it.',
                ].map((c, i) => (
                  <div className="cd-comment" key={c}>
                    <span className="cd-avatar">{i ? 'R' : 'M'}</span>
                    <div>
                      <strong>{i ? 'Riley' : 'Morgan'}</strong>
                      <p>{c}</p>
                    </div>
                  </div>
                ))}
                {(comments[showId] || []).map((c, i) => (
                  <div className="cd-comment" key={i}>
                    <span className="cd-avatar">{name[0]}</span>
                    <div>
                      <strong>{name}</strong>
                      <p>{c}</p>
                    </div>
                  </div>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!comment.trim()) return;
                    setComments((v) => ({
                      ...v,
                      [showId]: [...(v[showId] || []), comment.trim()],
                    }));
                    setComment('');
                    toast('Your comment was added.');
                  }}
                >
                  <label className="cd-label">
                    Join the conversation
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Leave a little appreciation…"
                      maxLength={300}
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="cd-primary"
                    disabled={!comment.trim()}
                  >
                    Post comment
                    <MessageCircle size={17} />
                  </button>
                </form>
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('watch')}
                >
                  Back to the episode
                </button>
              </>
            )}
            {view === 'creator' && (
              <>
                <div className="cd-profile-head">
                  <span className="cd-avatar cd-large-avatar">
                    {show.creator[0]}
                  </span>
                  <h5>{show.creator}</h5>
                  <p>Making little stories that stay with you.</p>
                  <div className="cd-profile-stats">
                    <span>
                      <b>3</b>Episodes
                    </span>
                    <span>
                      <b>
                        {following.includes(show.creator) ? '1,205' : '1,204'}
                      </b>
                      Followers
                    </span>
                  </div>
                </div>
                {primary(
                  following.includes(show.creator)
                    ? 'Following · tap to unfollow'
                    : 'Follow creator',
                  () =>
                    setFollowing((f) =>
                      f.includes(show.creator)
                        ? f.filter((x) => x !== show.creator)
                        : [...f, show.creator],
                    ),
                )}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('support')}
                >
                  Support with demo credits
                </button>
                <div className="cd-row-heading">
                  <h6>Latest series</h6>
                </div>
                {card(showId)}
              </>
            )}
            {view === 'create' && (
              <>
                <div className="cd-heading">
                  <span className="cd-eyebrow">YOUR STORY STARTS HERE</span>
                  <h5>Make a little magic.</h5>
                  {error && (
                    <p role="alert" className="cd-error">
                      {error}
                    </p>
                  )}
                  <p>Use the sample clip to explore publishing.</p>
                </div>
                <div
                  className={`cd-capture cd-thumb-create ${clip ? 'cd-selected' : ''}`}
                >
                  <span className="cd-pill">
                    {clip ? 'SAMPLE READY' : '20-SECOND SAMPLE'}
                  </span>
                  <Film size={38} />
                  <strong>A different way home</strong>
                </div>
                {primary(clip ? 'Sample selected' : 'Use sample clip', () => {
                  setClip(true);
                  setError('');
                  toast('Sample clip ready. Add your details next.');
                })}
                <button
                  type="button"
                  className="cd-secondary"
                  disabled={!clip}
                  onClick={() => go('details')}
                >
                  Continue to details <ChevronRight size={17} />
                </button>
                <p className="cd-small">
                  No files are uploaded. Your draft stays here while you explore
                  other screens.
                </p>
                {published.length > 0 && (
                  <button
                    type="button"
                    className="cd-text-button"
                    onClick={() => root('profile')}
                  >
                    View your published stories
                  </button>
                )}
              </>
            )}
            {view === 'details' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (
                    !title.trim() ||
                    (format === 'New series' && !series.trim())
                  ) {
                    setError(
                      'Add a video title and series name before continuing.',
                    );
                    return;
                  }
                  setClip(true);
                  go('review');
                }}
              >
                <p className="cd-small">STEP 2 OF 3 · DETAILS</p>
                <label className="cd-label">
                  Video title
                  <input
                    value={title}
                    onChange={(e) => {
                      editDraft();
                      setTitle(e.target.value);
                    }}
                    maxLength={60}
                    required
                    placeholder="Give your story a name"
                  />
                </label>
                <label className="cd-label">
                  Description
                  <textarea
                    value={description}
                    onChange={(e) => {
                      editDraft();
                      setDescription(e.target.value);
                    }}
                    maxLength={240}
                    placeholder="Set the scene…"
                  />
                </label>
                <label className="cd-label">
                  Publish as
                  <select
                    value={format}
                    onChange={(e) => {
                      editDraft();
                      setFormat(e.target.value);
                      if (e.target.value === 'Episode in a series')
                        setSeries('After Hours');
                    }}
                  >
                    {['Single video', 'New series', 'Episode in a series'].map(
                      (f) => (
                        <option key={f}>{f}</option>
                      ),
                    )}
                  </select>
                </label>
                {format === 'New series' && (
                  <label className="cd-label">
                    Series name
                    <input
                      value={series}
                      onChange={(e) => {
                        editDraft();
                        setSeries(e.target.value);
                      }}
                      required
                      maxLength={50}
                    />
                  </label>
                )}
                {format === 'Episode in a series' && (
                  <label className="cd-label">
                    Choose series
                    <select
                      value={series}
                      onChange={(e) => {
                        editDraft();
                        setSeries(e.target.value);
                      }}
                    >
                      <option>After Hours</option>
                      <option>Little Escapes</option>
                    </select>
                  </label>
                )}
                {error && (
                  <p role="alert" className="cd-error">
                    {error}
                  </p>
                )}
                <button type="submit" className="cd-primary">
                  Review story
                  <ChevronRight size={17} />
                </button>
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('create')}
                >
                  Back to clip · keep draft
                </button>
              </form>
            )}
            {view === 'review' && (
              <>
                <p className="cd-small">STEP 3 OF 3 · REVIEW</p>
                <div className="cd-review-art cd-thumb-create">
                  <Play size={32} />
                </div>
                <h5>{title.trim() || 'Untitled story'}</h5>
                <p>{description || 'No description added.'}</p>
                <dl className="cd-summary">
                  <div>
                    <dt>Format</dt>
                    <dd>{format}</dd>
                  </div>
                  {format !== 'Single video' && (
                    <div>
                      <dt>Series</dt>
                      <dd>{series}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Visibility</dt>
                    <dd>Demo only</dd>
                  </div>
                  <div>
                    <dt>Creator</dt>
                    <dd>{name}</dd>
                  </div>
                </dl>
                {primary('Publish demo story', () => publishStory('published'))}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('details')}
                >
                  Edit details
                </button>
              </>
            )}
            {view === 'published' && (
              <div className="cd-success">
                <CheckCircle2 size={60} />
                <span className="cd-eyebrow">THAT’S YOUR MOMENT</span>
                <h5>
                  {published.some((story) => story.id === draftId)
                    ? 'Your story is live.'
                    : 'Ready for your moment?'}
                  <br />
                  Right here.
                </h5>
                <p>
                  “{title}”{' '}
                  {published.some((story) => story.id === draftId)
                    ? 'now appears'
                    : 'is ready to appear'}{' '}
                  on your demo profile.
                </p>
                {primary(
                  published.some((story) => story.id === draftId)
                    ? 'View my profile'
                    : 'Publish & view my profile',
                  () => publishStory('profile'),
                )}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => root('create')}
                >
                  Create another story
                </button>
                <button
                  type="button"
                  className="cd-text-button"
                  onClick={() => root('home')}
                >
                  Back to discovery
                </button>
              </div>
            )}
            {view === 'wallet' && (
              <>
                <div className="cd-wallet-balance">
                  <span>DEMO BALANCE</span>
                  <strong>
                    {connected ? balance : '—'}
                    <small> credits</small>
                  </strong>
                  <p>
                    {connected
                      ? 'A little appreciation goes a long way.'
                      : 'Connect a sample wallet to explore.'}
                  </p>
                </div>
                {!connected ? (
                  primary('Connect demo wallet', () => {
                    setConnected(true);
                    toast(
                      'Demo wallet connected. 120 sample credits available.',
                    );
                  })
                ) : (
                  <>
                    <div className="cd-inline-success">
                      <CheckCircle2 size={16} />
                      Demo wallet connected
                    </div>
                    {primary('Support a creator', () => go('support'))}
                    <button
                      type="button"
                      className="cd-secondary"
                      onClick={() => {
                        setBalance((b) => b + 100);
                        toast(
                          'Added 100 free demo credits. No payment needed.',
                        );
                      }}
                    >
                      Add 100 demo credits
                    </button>
                  </>
                )}
                <div className="cd-row-heading">
                  <h6>Recent activity</h6>
                </div>
                {transactions.length ? (
                  transactions.map((tx, i) => (
                    <div className="cd-list-item" key={i}>
                      <Heart size={18} />
                      <span>
                        <strong>{tx.creator}</strong>
                        <small>Support sent · demo</small>
                      </span>
                      <b>−{tx.amount}</b>
                    </div>
                  ))
                ) : (
                  <div className="cd-empty cd-empty-small">
                    <Wallet size={26} />
                    <h6>A fresh start</h6>
                    <p>Your demo contributions will appear here.</p>
                  </div>
                )}
                <button
                  type="button"
                  className="cd-text-button"
                  onClick={() => root('home')}
                >
                  Discover creators to support
                </button>
              </>
            )}
            {view === 'support' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const value = Number(amount);
                  if (!connected) {
                    setConnected(true);
                    toast('Sample wallet connected. You can now send support.');
                    return;
                  }
                  if (!Number.isInteger(value) || value < 1) {
                    setError('Enter a whole number of at least 1 credit.');
                    return;
                  }
                  if (value > balance) {
                    setError(
                      'Not enough demo credits. Add credits below or enter a smaller amount.',
                    );
                    return;
                  }
                  setBalance((b) => b - value);
                  setTransactions((t) => [
                    { creator: show.creator, amount: value },
                    ...t,
                  ]);
                  go('supported');
                }}
              >
                <div className="cd-profile-head">
                  <span className="cd-avatar cd-large-avatar">
                    {show.creator[0]}
                  </span>
                  <h5>Appreciate {show.creator.split(' ')[0]}.</h5>
                  <p>Support the next small story.</p>
                </div>
                <label className="cd-label">
                  Choose a creator
                  <select
                    value={showId}
                    onChange={(e) => setShowId(Number(e.target.value))}
                  >
                    {shows.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.creator}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="cd-label">
                  Demo credits
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setError('');
                    }}
                    required
                  />
                </label>
                <div className="cd-amounts">
                  {[5, 10, 25].map((v) => (
                    <button
                      type="button"
                      key={v}
                      aria-pressed={amount === String(v)}
                      onClick={() => {
                        setAmount(String(v));
                        setError('');
                      }}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <p className="cd-small">
                  Available: {connected ? balance : '120 after connecting'}{' '}
                  credits. No real money.
                </p>
                {error && (
                  <div role="alert" className="cd-error">
                    {error}
                    <button
                      type="button"
                      className="cd-text-button"
                      onClick={() => {
                        setBalance((b) => b + 100);
                        setError('');
                        toast('100 demo credits added.');
                      }}
                    >
                      Add 100 free demo credits
                    </button>
                  </div>
                )}
                <button type="submit" className="cd-primary">
                  {connected ? 'Send demo support' : 'Connect demo wallet'}
                  <Heart size={17} />
                </button>
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('wallet')}
                >
                  Cancel · back to wallet
                </button>
              </form>
            )}
            {view === 'supported' && (
              <div className="cd-success">
                <Heart size={60} />
                <span className="cd-eyebrow">A LITTLE LOVE, SENT</span>
                <h5>
                  You backed
                  <br />
                  the next story.
                </h5>
                <p>
                  {amount} demo credits sent to {show.creator}. Your balance is
                  now {balance}.
                </p>
                {primary('View wallet activity', () => root('wallet'))}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('creator')}
                >
                  Visit creator
                </button>
                <button
                  type="button"
                  className="cd-text-button"
                  onClick={() => root('home')}
                >
                  Keep discovering
                </button>
              </div>
            )}
            {view === 'profile' && (
              <>
                <div className="cd-profile-head">
                  <span className="cd-avatar cd-large-avatar">
                    {name[0] || 'J'}
                  </span>
                  <h5>{name}</h5>
                  <p>{bio}</p>
                  <div className="cd-profile-stats">
                    <span>
                      <b>{published.length}</b>Stories
                    </span>
                    <span>
                      <b>{following.length}</b>Following
                    </span>
                    <span>
                      <b>{saved.length}</b>Saved
                    </span>
                  </div>
                </div>
                <div className="cd-profile-actions">
                  <button
                    type="button"
                    className="cd-secondary"
                    onClick={() => {
                      setDraftName(name);
                      setDraftBio(bio);
                      go('edit');
                    }}
                  >
                    Edit profile
                  </button>
                  <button
                    type="button"
                    className="cd-secondary"
                    onClick={() => go('settings')}
                  >
                    <Settings size={17} />
                    Settings
                  </button>
                </div>
                <div className="cd-row-heading">
                  <h6>Your stories</h6>
                </div>
                {published.length ? (
                  published.map((story) => (
                    <button
                      type="button"
                      className="cd-list-item"
                      key={story.id}
                      onClick={() => {
                        setOwnStory(story);
                        setShowId(0);
                        setEpisode(0);
                        setProgress(0);
                        go('watch');
                        setPlaying(true);
                      }}
                    >
                      <Film size={22} />
                      <span>
                        <strong>{story.title}</strong>
                        <small>Play your demo story</small>
                      </span>
                      <Play size={17} />
                    </button>
                  ))
                ) : (
                  <div className="cd-empty">
                    <Film size={28} />
                    <h6>Your first story starts here.</h6>
                    <p>Use a sample clip and make it yours.</p>
                  </div>
                )}
                {primary('Create a story', () => root('create'))}
                {saved.length > 0 && (
                  <>
                    <div className="cd-row-heading">
                      <h6>Saved for later</h6>
                    </div>
                    {saved.map(card)}
                  </>
                )}
              </>
            )}
            {view === 'edit' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!draftName.trim()) {
                    setError('Please add a display name.');
                    return;
                  }
                  setName(draftName.trim());
                  setBio(draftBio.trim());
                  go('profile');
                  toast('Profile updated.');
                }}
              >
                <label className="cd-label">
                  Display name
                  <input
                    value={draftName}
                    onChange={(e) => setDraftName(e.target.value)}
                    required
                    maxLength={40}
                  />
                </label>
                <label className="cd-label">
                  Bio
                  <textarea
                    value={draftBio}
                    onChange={(e) => setDraftBio(e.target.value)}
                    maxLength={150}
                  />
                </label>
                {error && (
                  <p role="alert" className="cd-error">
                    {error}
                  </p>
                )}
                <button type="submit" className="cd-primary">
                  Save changes
                  <Check size={17} />
                </button>
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('profile')}
                >
                  Cancel changes
                </button>
              </form>
            )}
            {view === 'settings' && (
              <>
                <h5>Make it yours.</h5>
                <label
                  className="cd-toggle"
                  htmlFor="cd-autoplay"
                  aria-label="Episode autoplay"
                >
                  <span>
                    <strong>Episode autoplay</strong>
                    <small>Continue to the next preview</small>
                  </span>
                  <input
                    id="cd-autoplay"
                    type="checkbox"
                    checked={autoplay}
                    onChange={(e) => setAutoplay(e.target.checked)}
                  />
                </label>
                <label
                  className="cd-toggle"
                  htmlFor="cd-notifications"
                  aria-label="Creator updates"
                >
                  <span>
                    <strong>Creator updates</strong>
                    <small>Demo preference · no messages sent</small>
                  </span>
                  <input
                    id="cd-notifications"
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                  />
                </label>
                <button
                  type="button"
                  className="cd-list-item"
                  onClick={() => go('wallet')}
                >
                  <Wallet size={18} />
                  <span>Manage demo wallet</span>
                  <ChevronRight size={18} />
                </button>
                {signedIn
                  ? primary('Sign out of demo', () => {
                      setSignedIn(false);
                      toast('Signed out. Your demo work is still here.');
                      root('profile');
                    })
                  : primary('Try demo sign-in', () => go('signin'))}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => root('profile')}
                >
                  Back to profile
                </button>
              </>
            )}
            {view === 'signin' && (
              <>
                <div className="cd-heading">
                  <h5>
                    Welcome to
                    <br />
                    your next story.
                  </h5>
                  <p>Try the account flow with a sample identity.</p>
                </div>
                <div className="cd-account">
                  <User size={24} />
                  <strong>{name}</strong>
                  <span>Demo account · no password needed</span>
                </div>
                {primary('Continue as ' + name.split(' ')[0], () => {
                  setSignedIn(true);
                  root('profile');
                  toast('You’re signed into the sample account.');
                })}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('recovery')}
                >
                  Try account recovery
                </button>
                <button
                  type="button"
                  className="cd-text-button"
                  onClick={() => root('home')}
                >
                  Continue as a guest
                </button>
              </>
            )}
            {view === 'recovery' && (
              <div className="cd-success">
                <CheckCircle2 size={48} />
                <h5>A way back in.</h5>
                <p>
                  In the live product, a recovery link would arrive by email.
                  Here, you can restore the sample session immediately.
                </p>
                {primary('Restore demo session', () => {
                  setSignedIn(true);
                  root('profile');
                  toast('Demo session restored.');
                })}
                <button
                  type="button"
                  className="cd-secondary"
                  onClick={() => go('signin')}
                >
                  Back to sign-in
                </button>
              </div>
            )}
          </div>
          <nav className="cd-bottom-nav" aria-label="Coinflix app navigation">
            {(
              [
                { key: 'home', label: 'Discover', icon: Home },
                { key: 'search', label: 'Search', icon: Search },
                { key: 'create', label: 'Create', icon: Plus },
                { key: 'wallet', label: 'Wallet', icon: Wallet },
                { key: 'profile', label: 'Profile', icon: User },
              ] as const
            ).map((item) => (
              <button
                type="button"
                key={item.key}
                aria-current={view === item.key ? 'page' : undefined}
                onClick={() => launch(item.key)}
              >
                <item.icon size={21} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
          <output
            className={`cd-toast ${notice ? 'is-visible' : ''}`}
            aria-live="polite"
          >
            {notice}
          </output>
        </div>
        <p className="cd-device-caption">
          {tour
            ? 'A quick tour of the experience'
            : 'Tap, type, and explore. Every screen has a way forward.'}
        </p>
      </div>
    </div>
  );
}
