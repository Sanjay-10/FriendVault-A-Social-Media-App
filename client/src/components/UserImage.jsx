import { Box } from "@mui/icons-material";

const UserImage = ({ image, size = "60px"}) =>{
    return (
        <Box width={size} height={size}>
            <img
            style={{ objectFit: "cover", borderRadius:"50%"}}
            width={size}
            height={size}
            alt="User"
            src={`http://localhost:3000/assets/${image}`}
            />
        </Box>
    );
}

export default UserImage;