import MovieCard from "@/components/MovieCard/MovieCard";
import type {Meta, StoryObj} from "@storybook/nextjs"

const meta: Meta<typeof MovieCard> = {
    title: "button",
    component: MovieCard,
}

export default meta

export const FilmCard: StoryObj<typeof MovieCard> = {
    args: {
        movie_title: "1",
        movie_thumbnail: "",
        source: "sb"
    }
}
