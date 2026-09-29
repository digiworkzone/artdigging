export default function VideoEmbed({
  youtubeId,
  start,
  title,
}: {
  youtubeId: string;
  start?: number;
  title: string;
}) {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (start) params.set("start", String(start));

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-soil shadow-2xl shadow-black/60">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?${params}`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
