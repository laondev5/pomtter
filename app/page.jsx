import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex flex-center flex-col'>
        <h1 className='head_text text-center'> 
            Discover & Share
            <br className='max-md:hidden'/>
            <span className='orange_gradient text-center'>
                AI Powered Prompts 
            </span>
        </h1>
        <p className='desc text-center'>
            Promtter is an AI tool that allow users to share prompts ala over the world
        </p>

        <Feed/>
        
    </section>
  )
}

export default Home