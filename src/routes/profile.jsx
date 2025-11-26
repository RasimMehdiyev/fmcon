const panelistProfile = {
    id: 'PNL-20240601',
    avatar: "/image.png",
    expertiseField: 'Artificial Intelligence',
    yearsOfExperience: 8,
    expertiseDescription:
        'Experienced in developing and deploying machine learning models, with a focus on natural language processing and ethical AI practices. Has contributed to multiple industry projects and academic publications.'
};

export default function Profile() {
    return (
        <div class="bg-gray-100 min-h-screen p-4 sm:p-8">
            <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <div class="bg-cover bg-center h-56 p-4" style={{ "background-image": "url('https://images.unsplash.com/photo-1557683316-973673baf926?w=500&h=200&fit=crop')" }}>
                    <div class="flex justify-end">
                        <div class="text-white text-xs font-bold rounded-lg bg-blue-500 p-2">Panelist ID: {panelistProfile.id}</div>
                    </div>
                    <div class="flex items-center mt-4">
                        <img class="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white" src={panelistProfile.avatar} alt="Panelist Avatar" />
                        <div class="ml-4">
                            <h2 class="text-xl sm:text-2xl font-bold text-white">{panelistProfile.expertiseField}</h2>
                        </div>
                    </div>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 bg-gray-50 rounded-lg">
                            <h3 class="font-bold text-gray-800">Years of Experience</h3>
                            <p class="text-gray-600">{panelistProfile.yearsOfExperience}</p>
                        </div>
                        <div class="p-4 bg-gray-50 rounded-lg col-span-1 md:col-span-2">
                            <h3 class="font-bold text-gray-800">Expertise Description</h3>
                            <p class="text-gray-600">{panelistProfile.expertiseDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

