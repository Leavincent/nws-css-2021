/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import { get, isEmpty } from 'lodash'
import useModalContext from '../contexts/modal'
import Focus from './Focus'
import ItemPreview from './ItemPreview'

const Item = ({ item, fetchNasaData, setInput }) => {
  const { setModal } = useModalContext()
  const { data, href, links } = item
  const {
    date_created,
    description,
    description_508,
    keywords = [],
    media_type,
    title,
  } = get(data, '[0]', {})

  const descriptionText = description_508 || description

  const fetchCollection = () => {
    axios.get(href).then(({ data: collection }) => {
      setModal(<Focus collection={collection} mediaType={media_type} />)
    })
  }

  return (
    <div className="item">
      <div className="item-img">
      <ItemPreview links={links} fetchCollection={fetchCollection} />
      </div>
      <div className="item-content">
      {title && <h2 className="item__title">{title}</h2>}
      {date_created && (
        <p className="item__date-created">
          {new Date(date_created).toLocaleDateString()}
        </p>
      )}
      {keywords && (
        <div className="item__keywords">
          {keywords.map((kw) => (
            <button
              key={kw}
              className="item__keyword"
              type="button"
              onClick={() => {
                setInput(kw)
                fetchNasaData(
                  `https://images-api.nasa.gov/search?q=${encodeURI(
                    kw,
                  )}&page=1`,
                )
              }}
            >
              {kw}
            </button>
          ))}
        </div>
      )}
      {descriptionText && (
        <p className="item__description">{descriptionText}</p>
      )}

    </div>
    </div>
  )
}

const Items = ({ items, fetchNasaData, setInput }) => {
  if (isEmpty(items)) {
    return <div className="items--empty">Aucun résultat</div>
  }

  return (
    <div className="items">
      {items.map((item) => (
        <Item
          key={item.href}
          item={item}
          fetchNasaData={fetchNasaData}
          setInput={setInput}
        />
      ))}
    </div>
  )
}

export default Items
