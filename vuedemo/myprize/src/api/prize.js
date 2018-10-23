import axios from 'axios'

export function getPrizeList() {
  const url = 'api/prizelist/get.do'
  // const url = 'api/prizelist/get.do?lpsust=ZAgAAAAAAAGE9MTAxMDc0NzMyNTMmYj0yJmM9NCZkPTExJmU9NzVGQUQzMTI1MUY5ODEzMzc4Njg4NTBDRDg4MjFEMDExJmg9MTUwODczNzg5MTgxNSZpPTYwNDgwMCZvPTg2OTgwMTAyNTY4NjI1NSZwPWltZWkmcT0wJnVzZXJuYW1lPTE4NjI4MzQ0NTE3JmlsPWNuFR1DcAHB0OwIpF0nZa60Ow'
  const data = { pageIndex: 1, pageSize: 100 }
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updateAddr(data) {
  const url = 'api/addr/post.do'
  // const url = 'api/addr/post.do?lpsust=ZAgAAAAAAAGE9MTAxMDc0NzMyNTMmYj0yJmM9NCZkPTExJmU9NzVGQUQzMTI1MUY5ODEzMzc4Njg4NTBDRDg4MjFEMDExJmg9MTUwODczNzg5MTgxNSZpPTYwNDgwMCZvPTg2OTgwMTAyNTY4NjI1NSZwPWltZWkmcT0wJnVzZXJuYW1lPTE4NjI4MzQ0NTE3JmlsPWNuFR1DcAHB0OwIpF0nZa60Ow'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function updateQQ(data) {
  const url = 'api/addr/post.do'
  // const url = 'api/qq/post.do?lpsust=ZAgAAAAAAAGE9MTAxMDc0NzMyNTMmYj0yJmM9NCZkPTExJmU9NzVGQUQzMTI1MUY5ODEzMzc4Njg4NTBDRDg4MjFEMDExJmg9MTUwODczNzg5MTgxNSZpPTYwNDgwMCZvPTg2OTgwMTAyNTY4NjI1NSZwPWltZWkmcT0wJnVzZXJuYW1lPTE4NjI4MzQ0NTE3JmlsPWNuFR1DcAHB0OwIpF0nZa60Ow'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
export function updateFlow(data) {
  const url = 'api/flow/post.do'
  // const url = 'api/exchg/post.do?lpsust=ZAgAAAAAAAGE9MTAxMDc0NzMyNTMmYj0yJmM9NCZkPTExJmU9NzVGQUQzMTI1MUY5ODEzMzc4Njg4NTBDRDg4MjFEMDExJmg9MTUwODczNzg5MTgxNSZpPTYwNDgwMCZvPTg2OTgwMTAyNTY4NjI1NSZwPWltZWkmcT0wJnVzZXJuYW1lPTE4NjI4MzQ0NTE3JmlsPWNuFR1DcAHB0OwIpF0nZa60Ow'
  return axios.post(url, data).then((res) => {
    return Promise.resolve(res.data)
  })
}
