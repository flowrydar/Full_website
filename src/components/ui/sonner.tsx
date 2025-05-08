import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "group wedding-toast flex items-center gap-x-4 bg-black/95 border border-wedding-gold/30 text-white rounded-lg shadow-lg",
          title: "text-wedding-gold text-base font-serif",
          description: "text-gray-300 text-sm",
          actionButton: "bg-wedding-gold text-black",
          cancelButton: "bg-wedding-lilac text-black",
          success: "wedding-toast-success border-wedding-gold/50 bg-gradient-to-r from-black to-black/95",
          error: "wedding-toast-error border-red-400/30 bg-gradient-to-r from-black to-black/95",
          loading: "wedding-toast-loading border-wedding-gold/30 bg-gradient-to-r from-black to-black/95",
          info: "wedding-toast-info border-wedding-lilac/30 bg-gradient-to-r from-black to-black/95"
        },
        duration: 4000,
      }}
      {...props}
    />
  )
}

export { Toaster }
