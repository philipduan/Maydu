// List of university names
const schoolNames = [
    'Algoma University',
    'Brock University',
    'Carleton University',
    'Collège militaire royal du Canada',
    'Collège Universitaire Dominicain',
    'Lakehead University',
    'Laurentian University',
    'McMaster University',
    'Nipissing University',
    'OCAD University',
    'Queen\'s University',
    'Redeemer University College',
    'Ryerson University',
    'The University of Western Ontario',
    'Trent University',
    'University of Guelph',
    'University of Ontario Institute of Technology',
    'University of Ottawa',
    'University of Toronto',
    'University of Waterloo',
    'University of Windsor',
    'Wilfrid Laurier University',
    'York University',
    'Algonquin College',
    'Cambrian College',
    'Canadore College',
    'Centennial College',
    'Collège Boréal',
    'Conestoga College',
    'Confederation College',
    'Durham College',
    'Fanshawe College',
    'Fleming College',
    'George Brown College',
    'Georgian College',
    'Humber College',
    'La Cité collégiale',
    'Lambton College',
    'Loyalist College',
    'Mohawk College',
    'Niagara College',
    'Northern College',
    'St. Clair College',
    'St. Lawrence College',
    'Sault College',
    'Seneca College',
    'Sheridan College'
];

export default schoolNames.map((school) => {
    return {
        displayName: school,
        value: school
    }
})



