export default function AQI2Text(AQILevel){
    const Map = {
        0:{level:'一级（优）',color:'#009966'},
        1:{level:'二级（良）',color:'#ffde33'},
        2:{level:'三级（轻度污染）',color:'#ff9933'},
        3:{level:'四级（中度污染）',color:'#cc0033'},
        4:{level:'五级（重度污染）',color:'#660099'},
        5:{level:'六级（严重污染）',color:'#7e0023'},
    }
    return(Map[AQILevel])
}