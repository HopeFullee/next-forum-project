import { PostType } from "@/types/post";
import axios from "@/lib/axios";
import ForumTable from "@/components/Forum/ForumTable";

export const dynamic = "force-dynamic";

const ForumPage = async () => {
  const response = await axios.get("/api/forum");

  const postList: PostType[] = await response.data;

  return (
    <section className="px-20 mx-auto max-w-840">
      <ForumTable postList={postList} />
    </section>
  );
};

export default ForumPage;
