import React, { useContext, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MessageCircle, Repeat2, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { YapContext } from '@/context/yapcontext'



const YapCard = ({ display_name, username, content, avatar, media ,yap, likes_count, replies_count }) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = React.useState(false)
  const { navigateToSingleYapView } = useContext(YapContext)
  const [images, setImages] = React.useState([])
  const [videos, setVideos] = React.useState([])


  useEffect(() => {
    if (media) {
      const imagesArray:[] = [];
      const videosArray:[] = [];

      media.forEach(item => {
        if (item.type === 'image') {
          imagesArray.push(item);
        } else if (item.type === 'video') {
          videosArray.push(item);
        }
      });

      setImages(imagesArray);
      setVideos(videosArray);
    }
  }, [media]);

  console.log(images);
  

  const renderMediaGrid = () => {
    const mediaCount = (images?.length || 0) + (videos?.length || 0)
    if (mediaCount === 0) return null

    let gridClassName = "grid gap-2 mt-3"
    if (mediaCount === 1) gridClassName += " grid-cols-1"
    else if (mediaCount === 2) gridClassName += " grid-cols-2"
    else if (mediaCount === 3) gridClassName += " grid-cols-2"
    else gridClassName += " grid-cols-2"

    return (
      <div className={gridClassName}>
        {images?.map((image, index) => (          
          <div key={`image-${index}`} className={`relative rounded-xl max-h-32 overflow-hidden ${mediaCount === 3 && index === 0 ? 'row-span-2' : ''}`}>
            <Image 
              src={image.url} 
              alt={`Yap media ${index + 1}`} 
              layout="responsive"
              width={200}
              height={mediaCount === 1 ? 280 : 100}
              objectFit="cover"
            />
          </div>
        ))}
        {videos?.map((video, index) => (
          <div key={`video-${index}`} className="relative rounded-xl overflow-hidden max-h-32">
            <video controls className="">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Card className="mb-4 hover:bg-gray-50 transition-colors duration-200 hover:cursor-pointer" 
      onClick={() => navigateToSingleYapView(yap, 'spc')}
    >
      <CardHeader className="flex flex-row items-start space-y-0 pb-3">
        <Avatar className="w-10 h-10 mr-3">
          <AvatarImage src={avatar} alt={display_name} />
          <AvatarFallback>{display_name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex-1 min-w-0 flex flex-col">
            <h3 className="font-bold text-sm truncate">{display_name}</h3>
            <p className="text-sm text-muted-foreground truncate">@{username}</p>
          </div>
          <p className="text-md mt-1 break-words">{content}</p>
        </div>
      </CardHeader>

      <CardContent className="pt-0 pb-3">
        {renderMediaGrid()}
      </CardContent>

      <CardFooter className="flex justify-between py-2 px-4 border-t">
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <MessageCircle className="w-4 h-4 mr-1" />
          <span className="text-xs">{replies_count}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-500">
          <Repeat2 className="w-4 h-4 mr-1" />
          <span className="text-xs">3.1K</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className={`${isLiked ? 'text-red-500' : 'text-muted-foreground'} hover:text-red-500`}
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
          <span className="text-xs">{likes_count}</span>
        </Button>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
          <Share2 className="w-4 h-4 mr-1" />
          <span className="text-xs">Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default YapCard
