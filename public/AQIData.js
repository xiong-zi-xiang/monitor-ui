const AQIData = [
    {
        AQI:'0 - 50',
        level:'一级（优）',
        influence:'空气质量令人满意，基本无空气污染',
        recommend:'各类人群可正常活动',
        color:'#009966',
        estimatedGrade:1,
    },
    {
        AQI:'51 -100',
        level:'二级（良）',
        influence:'空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响',
        recommend:'极少数异常敏感人群应减少户外活动',
        color:'#ffde33',
        estimatedGrade:2,
    },
    {
        AQI:'101-150',
        level:'三级（轻度污染）',
        influence:'易感人群症状有轻度加剧，健康人群出现刺激症状',
        recommend:'儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼',
        color:'#ff9933',
        estimatedGrade:3,
    },
    {
        AQI:'151-200',
        level:'四级（中度污染）',
        influence:'进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响',
        recommend:'儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动',
        color:'#cc0033',
        estimatedGrade:4,
    },
    {
        AQI:'201-300',
        level:'五级（重度污染）',
        influence:'心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状',
        recommend:'儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动',
        color:'#660099',
        estimatedGrade:5,
    },
    {
        AQI:'300+',
        level:'六级（严重污染）',
        influence:'健康人群运动耐受力降低，有明显强烈症状，提前出现某些疾病',
        recommend:'儿童、老年人和病人应停留在室内，避免体力消耗，一般人群避免户外活动',
        color:'#7e0023',
        estimatedGrade:6,
    },
]

export default AQIData