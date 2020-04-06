const formatDate = (date) => {
  const parsed = Date.parse((date))
  const options = { weekday: 'short', year: 'numeric', month: 'long',  hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false };

  return new Intl.DateTimeFormat('en-EN', options).format(parsed)
}

export  default formatDate