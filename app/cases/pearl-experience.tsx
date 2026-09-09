'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Heart,
  MessageCircle,
  Play,
  X,
  Maximize2,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
const library = [
  {
    name: 'Buttons',
    image: '4bac44e0-87b7-4d10-8020-bad314db94de.webp',
    width: 1367,
    height: 2926,
    headline: 'One action. Every state.',
    description:
      'Primary, secondary, loading, and disabled states share the same visual grammar. Different actions stay distinct without becoming different systems.',
  },
  {
    name: 'Profiles',
    image: 'e1fc8e68-6c1e-4fae-92e0-c67015ad73e5.webp',
    width: 1367,
    height: 2053,
    headline: 'A familiar place to begin.',
    description:
      'Creator identity, social proof, and ways to connect come together in a repeatable profile pattern.',
  },
  {
    name: 'Feed items',
    image: '7270e6e5-3a74-49d6-96bf-e5f7da962506.webp',
    width: 2657,
    height: 1906,
    headline: 'Different stories. Shared structure.',
    description:
      'Content and conversation use a consistent hierarchy, with recognisable places for authors, reactions, and supporting actions.',
  },
  {
    name: 'Chat',
    image: '69e4b493-fdd9-4c8a-9435-c72fa550bd9f.webp',
    width: 1475,
    height: 4147,
    headline: 'Conversation, considered.',
    description:
      'Message groups, participant identity, and interaction states extend the same system into community spaces.',
  },
];
export function PearlLibrary() {
  const [selected, setSelected] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const item = library[selected];
  return (
    <div className="pc-library">
      <div className="pc-library-copy">
        <div className="pc-library-tabs" aria-label="Component families">
          {library.map((l, i) => (
            <button
              key={l.name}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>0{i + 1}</span>
              {l.name}
              <ArrowRight size={16} />
            </button>
          ))}
        </div>
        <div className="pc-library-note">
          <span>FROM THE ORIGINAL LIBRARY</span>
          <h3>{item.headline}</h3>
          <p>{item.description}</p>
          <button onClick={() => setExpanded(true)}>
            Inspect the full sheet <Maximize2 size={15} />
          </button>
        </div>
      </div>
      <div className="pc-library-art">
        <div className="pc-art-bar">
          <span>PEARL / {item.name.toUpperCase()}</span>
          <span>COMPONENT ARCHIVE</span>
        </div>
        <button
          className="pc-sheet"
          onClick={() => setExpanded(true)}
          aria-label={`Expand ${item.name} component sheet`}
        >
          <Image
            unoptimized
            loading="eager"
            decoding="sync"
            src={'/notion/' + item.image}
            width={item.width}
            height={item.height}
            alt={`Original Pearl ${item.name.toLowerCase()} library with component variants and states`}
          />
          <span>
            Explore the details <ArrowUpRight size={17} />
          </span>
        </button>
      </div>
      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="pc-image-dialog">
          <DialogTitle>{item.name} — original component library</DialogTitle>
          <DialogDescription>
            Scroll to explore the full sheet. Close to return to the case study.
          </DialogDescription>
          <div className="pc-full-sheet">
            <Image
              unoptimized
              loading="eager"
              decoding="sync"
              src={'/notion/' + item.image}
              width={item.width}
              height={item.height}
              alt={`Full ${item.name.toLowerCase()} component sheet`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function PearlExperience() {
  const [active, setActive] = useState(false);
  return (
    <div className="pc-experience">
      <div className="pc-experience-bar">
        <span>
          <i /> INTERACTIVE PROTOTYPE
        </span>
        <div>
          {active && (
            <button onClick={() => setActive(false)}>
              <X size={14} /> Close preview
            </button>
          )}
          <Link href="/pearl" target="_blank">
            Open full screen <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
      {active ? (
        <iframe
          className="pc-demo-frame"
          src="/pearl"
          title="Pearl interactive creator community prototype"
        />
      ) : (
        <button className="pc-launch" onClick={() => setActive(true)}>
          <Image
            unoptimized
            loading="eager"
            decoding="sync"
            src="/notion/05d8ddd4-6026-4349-8762-701d637410ad.webp"
            alt="Pearl creator community shown across desktop and mobile"
            width={1400}
            height={1050}
          />
          <span className="pc-launch-caption">
            <span className="pc-play">
              <Play size={22} />
            </span>
            <strong>Come a little closer.</strong>
            <span>Launch the working prototype</span>
          </span>
        </button>
      )}
      <p className="pc-demo-disclaimer">
        A refreshed 2026 portfolio prototype with sample content and locally
        saved progress. Payments, gifts, and messages are simulated.
      </p>
    </div>
  );
}
export function PearlMoment() {
  const [followed, setFollowed] = useState(false);
  return (
    <div className="pc-moment">
      <div className="pc-moment-image">
        <Image
          unoptimized
          loading="eager"
          decoding="sync"
          src="/images/pearl/lake.png"
          width={584}
          height={457}
          alt="A quiet moment at a forest lake"
        />
        <span>THE LITTLE MOMENTS MATTER.</span>
      </div>
      <div className="pc-moment-card">
        <span className="pc-mini-label">A CREATOR. A COMMUNITY.</span>
        <div className="pc-person">
          <Image
            unoptimized
            loading="eager"
            decoding="sync"
            src="/images/pearl/avatar.png"
            alt="Teodor Kia"
            width={56}
            height={56}
          />
          <div>
            <strong>Teodor Kia</strong>
            <span>Stories from my corner of the world.</span>
          </div>
        </div>
        <button
          className={followed ? 'is-followed' : ''}
          onClick={() => setFollowed(!followed)}
          aria-pressed={followed}
        >
          {followed ? <Check size={16} /> : <Heart size={16} />}{' '}
          {followed ? 'Following' : 'Follow for free'}
        </button>
        <output>
          {followed
            ? 'A small action. A clear confirmation.'
            : 'Start with a simple hello.'}
        </output>
        <div className="pc-moment-chat">
          <MessageCircle size={18} />
          <p>
            Connection starts with
            <br />
            <strong>a familiar interaction.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
