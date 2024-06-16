import classNames from "classnames/bind";
import styles from "./create-movie.module.scss";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

const cx = classNames.bind(styles);

const dataCategory = [
  { "key": "2fb53017b3be83cd754a08adab3e916c", slug: "bi-an", name: "Bí Ẩn" },
  { "key": "ba6fd52e5a3aca80eaaf1a3b50a182db", slug: "hai-huoc", name: "Hài Hước" },
  { "key": "1bae5183d681b7649f9bf349177f7123", slug: "chien-tranh", name: "Chiến Tranh" },
  { "key": "2b1db3509d24deb92dff04427c3b8c02", slug: "chinh-kich", name: "Chính Kịch" },
  { "key": "bb2b4b030608ca5984c8dd0770f5b40b", slug: "tinh-cam", name: "Tình Cảm" },
  { "key": "3a17c7283b71fa84e5a8d76fb790ed3e", slug: "co-trang", name: "Cổ Trang" },
  { "key": "1645fa23fa33651cef84428b0dcc2130", slug: "tai-lieu", name: "Tài Liệu" },
  { "key": "9822be111d2ccc29c7172c78b8af8ff5", slug: "hanh-dong", name: "Hành Động" },
  { "key": "a7b065b92ad356387ef2e075dee66529", slug: "tam-ly", name: "Tâm Lý" },
  { "key": "7a035ac0b37f5854f0f6979260899c90", slug: "hinh-su", name: "Hình Sự" },
  { "key": "66c78b23908113d478d8d85390a244b4", slug: "phieu-luu", name: "Phiêu Lưu" },
  { "key": "01c8abbb7796a1cf1989616ca5c175e6", slug: "hoc-duong", name: "Học Đường" },
  { "key": "68564911f00849030f9c9c144ea1b931", slug: "vien-tuong", name: "Viễn Tưởng" },
  { "key": "a2492d6cbc4d58f115406ca14e5ec7b6", slug: "gia-dinh", name: "Gia Đình" },
  { "key": "0bcf4077916678de9b48c89221fcf8ae", slug: "khoa-hoc", name: "Khoa Học" },
  { "key": "252e74b4c832ddb4233d7499f5ed122e", slug: "am-nhac", name: "Âm Nhạc" },
  { "key": "591bbb2abfe03f5aa13c08f16dfb69a2", slug: "the-thao", name: "Thể Thao" },
  { "key": "4db8d7d4b9873981e3eeb76d02997d58", slug: "kinh-di", name: "Kinh Dị" },
  { "key": "d9983d88d8929b1d9f767884e2999e27", slug: "hoat-hinh", name: "Hoạt Hình" },
  { "key": "f8ec3e9b77c509fdf64f0c387119b916", slug: "lich-su", name: "Lịch Sử" },
  { "key": "578f80eb493b08d175c7a0c29687cbdf", slug: "vo-thuat", name: "Võ Thuật" },
];
  
const dataCountry = [
  { "key": "d4097fbffa8f7149a61281437171eb83", slug: "nhat-ban", name: "Nhật Bản" },
  { "key": "aadd510492662beef1a980624b26c685", slug: "an-do", name: "Ấn Độ" },
  { "key": "3e075636c731fe0f889c69e0bf82c083", slug: "trung-quoc", name: "Trung Quốc" },
  { "key": "cefbf1640a17bad1e13c2f6f2a811a2d", slug: "thai-lan", name: "Thái Lan" },
  { "key": "05de95be5fc404da9680bbb3dd8262e6", slug: "han-quoc", name: "Hàn Quốc" },
  { "key": "932bbaca386ee0436ad0159117eabae4", slug: "anh", name: "Anh" },
  { "key": "74d9fa92f4dea9ecea8fc2233dc7921a", slug: "au-my", name: "Âu Mỹ" },
  { "key": "61709e9e6ca6ca8245bc851c0b781673", slug: "thuy-dien", name: "Thụy Điển" },
  { "key": "dcd5551cbd22ea2372726daafcd679c1", slug: "hong-kong", name: "Hồng Kông" },
  { "key": "42537f0fb56e31e20ab9c2305752087d", slug: "brazil", name: "Brazil" },
  { "key": "8a40abac202ab3659bb98f71f05458d1", slug: "tay-ban-nha", name: "Tây Ban Nha" },
  { "key": "24a5bf049aeef94ab79bad1f73f16b92", slug: "duc", name: "Đức" },
  { "key": "559fea9881e3a6a3e374b860fa8fb782", slug: "dai-loan", name: "Đài Loan" },
  { "key": "92f688188aa938a03a61a786d6616dcb", slug: "phap", name: "Pháp" },
  { "key": "445d337b5cd5de476f99333df6b0c2a7", slug: "canada", name: "Canada" },
  { "key": "bb6a72b6a93150d4181e50496fc15f5a", slug: "mongolia", name: "Mongolia" },
  { "key": "69e561770d6094af667b9361f58f39bd", slug: "thuy-si", name: "Thụy Sĩ" },
  { "key": "77dab2f81a6c8c9136efba7ab2c4c0f2", slug: "philippines", name: "Philippines" },
  { "key": "435a85571578e419ed511257881a1e75", slug: "uc", name: "Úc" },
  { "key": "f6ce1ae8b39af9d38d653b8a0890adb8", slug: "viet-nam", name: "Việt Nam" },
];
  
const CreateMoviePage = () => {
    const [state, setState] = useState({
        created: "",
        name: "",
        slug: "",
        origin_name: "",
        content: "",
        type: "",
        status: "",
        poster_url: "",
        thumb_url: "",
        trailer_url: "",
        time: "",
        episode_current: "",
        episode_total: "",
        quality: "",
        lang: "",
        year: "",
        actor: "",
        director: "",
        category: [],
        country: [],
        episodes: ""
    });
    const [categoryClicked, setCategoryClicked] = useState(false);
    const [countryClicked, setCountryClicked] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/create-movie`, {
                ...state
            });
            console.log(state.category)
            if (response.status === 200) {
                console.log("Success !");
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleChangeForm = (currentValue, event) => {
        setState(prev => ({...prev, [currentValue]: event.target.value}));
    }

    const handleSelectChange = (currentValue, event) => {
        const { checked, dataset } = event.target;
        const id = dataset.key;
        const name = event.target.nextSibling.textContent.trim();
        const slug = dataset.slug;
        setState(prevState => {
            const exists = prevState[currentValue].some(item => item.slug === slug);
            if (checked && !exists) {
                return { ...prevState, [currentValue]: [...prevState[currentValue], { id, name, slug }] };
            } else if (!checked && exists) {
                return { ...prevState, [currentValue]: prevState[currentValue].filter(item => item.slug !== slug) };
            }
            return prevState;
        });
    };
    
    return (
        <div className={cx("create-movie-page")}>
            <form className={cx("form-add-movie")} onSubmit={handleSubmit}>
                <h3>New Movie</h3>
                <input type="date" name="created" value={state.created} onChange={(e) => handleChangeForm("created", e)} className={cx("form-input")} required />
                <input type="text" name="name" value={state.name} onChange={(e) => handleChangeForm("name", e)} placeholder="Name" className={cx("form-input")} required />
                <input type="text" name="slug" value={state.slug} onChange={(e) => handleChangeForm("slug", e)} placeholder="Slug" className={cx("form-input")} required />
                <input type="text" name="origin_name" value={state.origin_name} onChange={(e) => handleChangeForm("origin_name", e)} placeholder="Origin Name" className={cx("form-input")} required />
                <input type="text" name="content" value={state.content} onChange={(e) => handleChangeForm("content", e)} placeholder="Content" className={cx("form-input")} required />
                <select name="type" value={state.type} onChange={(e) => handleChangeForm("type", e)} className={cx("form-select")}>
                    <option value="hoathinh">hoathinh</option>
                    <option value="series">series</option>
                    <option value="single">single</option>
                    <option value="tvshows">tvshows</option>
                </select>
                <select name="status" value={state.status} onChange={(e) => handleChangeForm("status", e)} className={cx("form-select")}>
                    <option value="ongoing">ongoing</option>
                    <option value="completed">completed</option>
                </select>
                <input type="text" name="poster_url" value={state.poster_url} onChange={(e) => handleChangeForm("poster_url", e)} placeholder="Poster" className={cx("form-input")} required />
                <input type="text" name="thumb_url" value={state.thumb_url} onChange={(e) => handleChangeForm("thumb_url", e)} placeholder="Thumbnail" className={cx("form-input")} required />
                <input type="text" name="trailer_url" value={state.trailer_url} onChange={(e) => handleChangeForm("trailer_url", e)} placeholder="Trailer" className={cx("form-input")} required />
                <input type="text" name="time" value={state.time} onChange={(e) => handleChangeForm("time", e)} placeholder="Time" className={cx("form-input")} />
                <input type="text" name="episode_current" value={state.episode_current} onChange={(e) => handleChangeForm("episode_current", e)} placeholder="Episode Current" className={cx("form-input")} required />
                <input type="text" name="episode_total" value={state.episode_total} onChange={(e) => handleChangeForm("episode_total", e)} placeholder="Episode Total" className={cx("form-input")} required />
                <input type="text" name="quality" value={state.quality} onChange={(e) => handleChangeForm("quality", e)} placeholder="Quality" className={cx("form-input")} required />
                <input type="text" name="lang" value={state.lang} onChange={(e) => handleChangeForm("lang", e)} placeholder="Lang" className={cx("form-input")} required />
                <select name="year" value={state.year} onChange={(e) => handleChangeForm("year", e)} className={cx("form-select")}>
                    <option value="2024">2024</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                </select>
                <input type="text" name="actor" value={state.actor} onChange={(e) => handleChangeForm("actor", e)} placeholder="Actor" className={cx("form-input")} required />
                <input type="text" name="director" value={state.director} onChange={(e) => handleChangeForm("director", e)} placeholder="Director" className={cx("form-input")} required />
                <div className={cx("form-item")}>
                    <div className={cx("select-item")} onClick={() => { setCategoryClicked(!categoryClicked); setCountryClicked(false) }}>
                        <strong>Category</strong>
                        <KeyboardArrowDownIcon className={cx("icon")} />
                    </div>
                    { categoryClicked && <ul name="category" className={cx("list")}>
                        {dataCategory.map((category) => {
                            return (
                                <li key={category.slug}>
                                    <input 
                                        type="checkbox" checked={state.category.some(c => c.slug === category.slug)}
                                        onChange={(event) => handleSelectChange('category', event)}
                                        data-key={category.key}
                                        data-slug={category.slug} 
                                    />
                                        {category.name}
                                </li>
                            );
                        })}
                    </ul> }
                </div>
                <div className={cx("form-item")}>
                    <div className={cx("select-item")} onClick={() => { setCountryClicked(!countryClicked); setCategoryClicked(false) }}>
                        <strong>Country</strong>
                        <KeyboardArrowDownIcon className={cx("icon")} />
                    </div>
                    { countryClicked && <ul name="country" className={cx("list")}>
                        {dataCountry.map((country) => {
                            return (
                                <li key={country.slug}>
                                    <input 
                                        type="checkbox" checked={state.category.some(c => c.slug === country.slug)}
                                        onChange={(event) => handleSelectChange('category', event)}
                                        data-key={country.key}
                                        data-slug={country.slug} 
                                    />
                                        {country.name}
                                </li>
                            );
                        })}
                    </ul> }
                </div>
                <input type="text" name="episodes" value={state.episodes} onChange={(e) => handleChangeForm("episodes", e)} placeholder="Example: Tập 1|tap-1|filename|link_embed|link_m3u8,..." className={cx("form-input")} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateMoviePage;