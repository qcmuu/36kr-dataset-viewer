// English mapping configuration for Chinese fields
const mappingConfig = {
    // Industry mapping
    industry: {
        // Single industries
        "医疗健康": "Healthcare",
        "汽车出行": "Automotive & Mobility",
        "企业服务": "Enterprise Services",
        "消费电商": "E-commerce",
        "前沿技术": "Frontier Technology",
        "先进制造": "Advanced Manufacturing",
        "文化娱乐": "Culture & Entertainment",
        "本地生活": "Local Services",
        "教育": "Education",
        "广告营销": "Advertising & Marketing",
        "能源环保": "Energy & Environment",
        "农林牧渔": "Agriculture",
        "物流": "Logistics",
        "社交网络": "Social Network",
        "区块链": "Blockchain",
        "体育游戏": "Sports & Gaming",
        "传统制造": "Traditional Manufacturing",
        "跨境出海": "Cross-border",
        "工具软件": "Tools & Software",
        "物联网/硬件": "IoT & Hardware",
        "智能硬件": "Smart Hardware",
        "其他": "Others",
        "元宇宙": "Metaverse",
        "金融": "Finance",
        
        // Combined industries (split by spaces or special characters)
        "企业服务  产业升级": "Enterprise Services & Industrial Upgrade",
        "消费电商  其他": "E-commerce & Others",
        "消费电商  产业升级": "E-commerce & Industrial Upgrade",
        "企业服务  前沿技术": "Enterprise Services & Frontier Technology",
        "医疗健康  先进制造": "Healthcare & Advanced Manufacturing",
        "消费电商  医疗健康": "E-commerce & Healthcare",
        "消费电商  汽车出行": "E-commerce & Automotive",
        "消费电商  本地生活": "E-commerce & Local Services",
        "文化娱乐  消费电商": "Culture & E-commerce",
        "前沿技术  先进制造": "Frontier Tech & Advanced Manufacturing",
        "前沿技术  工具软件": "Frontier Tech & Software Tools",
        "汽车出行  物流": "Automotive & Logistics",
        "汽车出行  物联网/硬件": "Automotive & IoT/Hardware",
        "汽车出行  前沿技术": "Automotive & Frontier Tech",
        "汽车出行  能源环保": "Automotive & Energy/Environment",
        "产业升级  前沿技术": "Industrial Upgrade & Frontier Tech",
        "产业升级  农林牧渔": "Industrial Upgrade & Agriculture",
        "产业升级  能源环保": "Industrial Upgrade & Energy/Environment",
        "医疗健康  其他": "Healthcare & Others",
        "医疗健康  农林牧渔": "Healthcare & Agriculture",
        "医疗健康  跨境出海": "Healthcare & Cross-border",
        "医疗健康  工具软件": "Healthcare & Software Tools",
        "消费电商  先进制造": "E-commerce & Advanced Manufacturing",
        "消费电商  社交网络": "E-commerce & Social Network",
        "消费电商  区块链": "E-commerce & Blockchain",
        "先进制造  体育游戏": "Advanced Manufacturing & Sports/Gaming",
        "先进制造  能源环保": "Advanced Manufacturing & Energy/Environment",
        "文化娱乐  前沿技术": "Culture & Frontier Tech",
        "文化娱乐  教育": "Culture & Education",
        "前沿技术  智能硬件": "Frontier Tech & Smart Hardware",
        "前沿技术  医疗健康": "Frontier Tech & Healthcare",
        "前沿技术  物联网/硬件": "Frontier Tech & IoT/Hardware",
        "前沿技术  社交网络": "Frontier Tech & Social Network",
        "前沿技术  传统制造": "Frontier Tech & Traditional Manufacturing",
        "汽车出行  智能硬件": "Automotive & Smart Hardware",
        "企业服务  医疗健康": "Enterprise Services & Healthcare",
        "农林牧渔  能源环保": "Agriculture & Energy/Environment",
        "能源环保  智能硬件": "Energy/Environment & Smart Hardware",
        "教育  前沿技术": "Education & Frontier Tech",
        "教育  本地生活": "Education & Local Services",
        "产业升级  智能硬件": "Industrial Upgrade & Smart Hardware",
        "产业升级  先进制造": "Industrial Upgrade & Advanced Manufacturing",
        "产业升级  广告营销": "Industrial Upgrade & Advertising",
        "产业升级  传统制造": "Industrial Upgrade & Traditional Manufacturing",
        "产业升级  其他": "Industrial Upgrade & Others",
        "消费电商  其他": "E-commerce & Others",
        "前沿技术  其他": "Frontier Technology & Others",
        "企业服务  其他": "Enterprise Services & Others",
        "医疗健康  其他": "Healthcare & Others",
        "本地生活  其他": "Local Services & Others",
        "文化娱乐  其他": "Culture & Entertainment & Others",
        "教育  其他": "Education & Others",
        "工具软件  其他": "Tools & Software & Others",
        "元宇宙  其他": "Metaverse & Others",
        "先进制造  其他": "Advanced Manufacturing & Others",
        "物联网/硬件  其他": "IoT/Hardware & Others",
        "社交网络  其他": "Social Network & Others",
        "金融  其他": "Finance & Others",
        "传统制造  其他": "Traditional Manufacturing & Others"
    },
    
    // Financing round mapping
    financing: {
        "种子轮": "Seed",
        "未融资": "Unfunded",
        "未披露": "Undisclosed",
        "未透露": "Undisclosed",
        "暂未披露": "Undisclosed",
        "暂无": "N/A",
        "不需要融资": "No Funding Needed",
        "未知": "Unknown",
        "null": "N/A",
        "天使轮": "Angel",
        "天使+": "Angel+",
        "天使+轮": "Angel+",
        "天使++轮": "Angel++",
        "天使++": "Angel++",
        "Pre-A轮": "Pre-A",
        "Pre-A+": "Pre-A+",
        "Pre-A+轮": "Pre-A+",
        "Pre-A++轮": "Pre-A++",
        "Pre-A+++轮": "Pre-A+++",
        "Pre-A轮+": "Pre-A+",
        "Pre A+轮": "Pre-A+",
        "A轮": "Series A",
        "A+轮": "Series A+",
        "A++轮": "Series A++",
        "A+++轮": "Series A+++",
        "A++++轮": "Series A++++",
        "A2轮": "Series A2",
        "A2+轮": "Series A2+",
        "B轮": "Series B",
        "B+轮": "Series B+",
        "B++轮": "Series B++",
        "B+++轮": "Series B+++",
        "B1轮": "Series B1",
        "B2轮": "Series B2",
        "Pre-B轮": "Pre-B",
        "Pre-B+轮": "Pre-B+",
        "C轮": "Series C",
        "C+轮": "Series C+",
        "C++轮": "Series C++",
        "C1轮": "Series C1",
        "C2轮": "Series C2",
        "Pre-C轮": "Pre-C",
        "Pre-C++轮": "Pre-C++",
        "D轮": "Series D",
        "D+轮": "Series D+",
        "D++轮": "Series D++",
        "D+++": "Series D+++",
        "D1轮": "Series D1",
        "D++轮": "Series D++",
        "E轮": "Series E",
        "E+轮": "Series E+",
        "F轮": "Series F",
        "F+轮": "Series F+",
        "G轮": "Series G",
        "G+轮": "Series G+",
        "Pre-IPO": "Pre-IPO",
        "Pre-IPO+": "Pre-IPO+",
        "IPO": "IPO",
        "Post-IPO": "Post-IPO",
        "已上市": "Listed",
        "已退市/私有化": "Delisted/Private",
        "战略融资": "Strategic",
        "股权融资": "Equity",
        "定向增发": "Private Placement",
        "出资设立": "Capital Injection",
        "并购/合并": "M&A",
        "并购": "M&A",
        "并购换股": "M&A Stock Swap",
        "债权融资": "Debt Financing",
        "股权转让": "Equity Transfer",
        "新三板": "New OTC Market",
        "新三板（摘牌）": "New OTC (Delisted)",
        "新三板上市": "New OTC Listing",
        "SPAC上市": "SPAC Listing",
        "借壳上市": "Backdoor Listing",
        "基石轮": "Cornerstone",
        "基石投资轮": "Cornerstone Investment",
        "众筹融资": "Crowdfunding",
        "外商独资": "Wholly Foreign Owned",
        "官方披露": "Official Disclosure"
    },
    
    // Location mapping
    location: {
        "北京市": "Beijing",
        "广东省": "Guangdong",
        "江苏省": "Jiangsu",
        "浙江省": "Zhejiang",
        "上海市": "Shanghai",
        "四川省": "Sichuan",
        "山东省": "Shandong",
        "湖南省": "Hunan",
        "福建省": "Fujian",
        "江西省": "Jiangxi",
        "湖北省": "Hubei",
        "广西壮族自治区": "Guangxi",
        "安徽省": "Anhui",
        "重庆市": "Chongqing",
        "云南省": "Yunnan",
        "香港特别行政区": "Hong Kong",
        "陕西省": "Shaanxi",
        "内蒙古自治区": "Inner Mongolia",
        "美国": "United States",
        "河南省": "Henan",
        "河北省": "Hebei",
        "贵州省": "Guizhou",
        "甘肃省": "Gansu",
        "辽宁省": "Liaoning",
        "吉林省": "Jilin",
        "黑龙江省": "Heilongjiang",
        "天津市": "Tianjin",
        "海南省": "Hainan",
        "宁夏回族自治区": "Ningxia",
        "新疆维吾尔自治区": "Xinjiang",
        "西藏自治区": "Tibet",
        "青海省": "Qinghai",
        "台湾省": "Taiwan",
        "澳门特别行政区": "Macau",
        "海外": "Overseas"
    },
    
    // Year mapping (remove "年" character for English display)
    year: {
        // Function to format year by removing "年" character
        format: function(year) {
            return year ? year.replace('年', '') : year;
        }
    }
};

// Function to map Chinese text to English
function mapToEnglish(field, value) {
    if (!value) return value;
    
    const fieldMapping = mappingConfig[field];
    if (!fieldMapping) return value;
    
    // Special handling for year field
    if (field === 'year' && fieldMapping.format) {
        return fieldMapping.format(value);
    }
    
    // Check for exact match first
    if (fieldMapping[value]) {
        return fieldMapping[value];
    }
    
    // For industries, try to handle variations
    if (field === 'industry') {
        // Try to normalize whitespace
        const normalizedValue = value.replace(/\s+/g, ' ').trim();
        if (fieldMapping[normalizedValue]) {
            return fieldMapping[normalizedValue];
        }
    }
    
    // Return original value if no mapping found
    return value;
}

// Function to apply mapping to all data
function applyDataMapping(data) {
    return data.map(item => ({
        ...item,
        industry_en: mapToEnglish('industry', item.industry),
        financing_round_en: mapToEnglish('financing', item.financing_round),
        location_en: mapToEnglish('location', item.location),
        establish_year_en: mapToEnglish('year', item.establish_year)
    }));
}