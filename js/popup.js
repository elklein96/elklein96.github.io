$('#open-popup').magnificPopup({
    items: [
      {
        src: 'https://www.youtube.com/watch?v=cdub86WUJo4',
        type: 'iframe' // this overrides default type
      }
    ],
    gallery: {
      enabled: true
    },
    type: 'video' // this is a default type
});