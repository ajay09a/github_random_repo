export async function githubRepo(language:string) {
    const res = await fetch(`https://api.github.com/search/repositories?q=language:${language}`);

    if(!res){
        throw new Error("Fetching API failed");
    }

    return res.json();
    
}