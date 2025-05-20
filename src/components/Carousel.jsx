import React, { useState } from 'react'
import { Button } from 'neetoui'
import { Left, Right } from 'neetoicons'
import classNames from 'classnames'

const Carousel = ({ imageUrls, title }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % imageUrls.length;
    setCurrentIndex(nextIndex)
  }

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + imageUrls.length) % imageUrls.length;
    setCurrentIndex(previousIndex)
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
                  onClick={() => setCurrentIndex(index)}

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
        onClick={handleNext}
      />
    </div>
  )
}

export default Carousel