import React from 'react'

const Featured = () => {
  const featured = [
    {
      title: 'free shipping',
      icon: 'https://firebasestorage.googleapis.com/v0/b/green-6bd7d.appspot.com/o/Icons%2F1.png?alt=media&token=93ef8875-d4cb-4cec-ad31-91bb55b52f2d',
      desc: 'on order over $200'
    },
    {
      title: 'support',
      icon: 'https://firebasestorage.googleapis.com/v0/b/green-6bd7d.appspot.com/o/Icons%2F2.png?alt=media&token=c6414288-6b50-469b-ac86-9d54ef86c9bb',
      desc: 'friendly support 24/7'
    },
    {
      title: 'contact us',
      icon: 'https://firebasestorage.googleapis.com/v0/b/green-6bd7d.appspot.com/o/Icons%2F4.png?alt=media&token=ea67a0c4-4cb1-468e-8900-11c4cef3b42d',
      desc: '+1 866 993 9308'
    },
  ]
  return (
    <section className="flex md:flex-row flex-col p-10 items-center justify-center gap-5">
      {featured.map(f=>(<div className="flex flex-col  rounded-md gap-2 p-4 px-20 items-center justify-center" key={f.title} >
        <img src={f.icon} alt={f.title} />
        <p className="uppercase font-normal text-green-600">{f.title}</p>
        <p className="text-sm text-gray-600">{f.desc}</p>
      </div>))}
    </section>
  )
}

export default Featured