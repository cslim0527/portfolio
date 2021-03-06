const Timeline = function(selector, url) {
    const _timeline = document.querySelector(selector)
    const _url = url
    const loading = document.querySelector('._4emnV')
    const imgPath = 'https://raw.githubusercontent.com/it-crafts/mockapi/master/'
    const template = `<div class="Nnq7C weEfm"><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src1 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src2 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div><div class="v1Nh3 kIKUG _bz0w"><a href="javascript:;"><div class="eLAPa"><div class="KL4Bh"><img class="FFVAD" decoding="auto" src="{{ src3 }}" style="object-fit: cover;"></div><div class="_9AhH0"></div></div><div class="u7YqG"><span aria-label="슬라이드" class="mediatypesSpriteCarousel__filled__32 u-__7"></span></div></a></div></div>`

    let _page = 1
    let totalPage = 1
    let totalHtml = ''

    const create = async () => {
        console.log('[Timeline] create()')
        loading.style.display = ''
        initScroll()
        renderMoreTimeline(await getTimelineData(_page))
        loading.style.display = 'none'
    }

    const initScroll = async () => {
        const data = await getTimelineInfo()
        totalPage = data.totalPage
        addEvents()
    }

    const destroy = () => {
        removeEvents()
    }

    const getTimelineData = async (_page) => {
        const res = await fetch(_url + _page)
        const { data } = await res.json()
        return data
    }

    const getTimelineInfo = async () => {
        const res = await fetch(_url + 'info')
        const { data } = await res.json()
        return data
    }

    const renderMoreTimeline = (data = []) => {
        let html = ''
        html = data.length ? getTimelineHtml(data) : '타임라인이 없습니다.'
        totalHtml += html 
        _timeline.innerHTML = totalHtml
    }

    const getTimelineHtml = (data) => {
        return data.reduce((html, item) => {
            html += replaceImgUrl(item)
            return html
        }, '')
    }

    const replaceImgUrl = (item) => {
        let i = 0
        return template.replace(/{{ *(\w+) *}}/g, () => imgPath + item[i++])
    }

    const addEvents = () => {
        window.addEventListener('scroll', onScroll)
    }

    const onScroll = async () => {
        const docHeight = document.documentElement.scrollHeight
        const winHeight = document.documentElement.clientHeight
        const scrollTop = window.pageYOffset
        if (totalPage <= _page) {
            removeEvents()
            return
        }

        if(loading.style.display === '') return
        if (scrollTop + winHeight > docHeight - 200) {
            loading.style.display = ''
            _page++
            renderMoreTimeline(await getTimelineData(_page))
            loading.style.display = 'none'
        }
    }

    const removeEvents = () => {
        window.removeEventListener('scroll', onScroll)
    }

    create()

    return {
        destroy
    }
}


export default Timeline