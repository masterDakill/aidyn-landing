'use client'

interface PolycamEmbedProps {
  captureId: string
  className?: string
}

export default function PolycamEmbed({ 
  captureId, 
  className = '' 
}: PolycamEmbedProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <iframe
        src={`https://poly.cam/capture/${captureId}/embed`}
        title="Polycam 3D Scan"
        className="h-full w-full rounded-2xl"
        style={{
          minHeight: '280px',
          minWidth: '280px',
          maxHeight: '720px',
          maxWidth: '1280px',
          border: 'none'
        }}
        allow="xr-spatial-tracking"
        loading="lazy"
      />
    </div>
  )
}
