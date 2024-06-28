export default function AQI2Text(AQILevel) {
    const Map = {
        1: {level: '一级（优）', color: '#009966'},
        2: {level: '二级（良）', color: '#ffde33'},
        3: {level: '三级（轻度污染）', color: '#ff9933'},
        4: {level: '四级（中度污染）', color: '#cc0033'},
        5: {level: '五级（重度污染）', color: '#660099'},
        6: {level: '六级（严重污染）', color: '#7e0023'},
    }
    return (Map[AQILevel] !== undefined ? Map[AQILevel] : {level: '不存在', color: '#000'})
}