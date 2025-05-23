import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'neetoui'
import { Left, Right } from 'neetoicons'
import classNames from 'classnames'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { useShowProduct } from "hooks/reactQuery/useProductsApi";
import { append } from "ramda";

const Carousel = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const { slug } = useParams();
  const timeRef = useRef(null);

  const { data: { imageUrl, imageUrls: partialImageUrls, title } = {} } =
    useShowProduct(slug);

  const imageUrls = append(imageUrl, partialImageUrls);

  useEffect(() => {
    timeRef.current = setInterval(handleNext, 3000);
    return () => {clearInterval(timeRef.current)}
  }, [])

  const resetTimer = () => {
    clearInterval(timeRef.current)
    timeRef.current = setInterval(handleNext, 3000);
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % imageUrls.length)
  }

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + imageUrls.length) % imageUrls.length)
    resetTimer();
  }

  return (
    <div className='flex items-center'>
      <Button
        className="shrink-0 focus-within:ring-0 hover:bg-transparent"
        icon={Left}
        style="text"
        onClick={handlePrevious}
      />
      <div className='flex items-center justify-center space-y-1 flex-col'>
        <img
          className='max-w-56 h-56 max-h-56 w-56'
          src={imageUrls[currentIndex]}
          alt={title}
        />
        <div className='flex space-x-1'>
          {
            imageUrls.map((_, index) => {
              // let defaultClasses = "inline-block neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border"
              // defaultClasses = currentIndex === index ? defaultClasses.concat(" bg-black") : defaultClasses;
              return (
                <span
                  // className={defaultClasses}
                  className={classNames("inline-block neeto-ui-border-black neeto-ui-rounded-full h-3 w-3 cursor-pointer border", {" neeto-ui-bg-black" : currentIndex === index})}
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    resetTimer();
                  }}

                ></span>
              )
            })
          }
        </div>
      </div>
      <Button
        className='shrink-0 focus-within:ring-0 hover:bg-transparent'
        icon={Right}
        style="text"
        onClick={() => {
          handleNext();
          resetTimer();
        }}
      />
    </div>
  )
}

export default Carousel