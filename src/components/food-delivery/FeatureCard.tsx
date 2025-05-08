
import Icon from "@/components/ui/icon";
import { Feature } from "@/types/food-delivery";

interface FeatureCardProps {
  feature: Feature;
}

const FeatureCard = ({ feature }: FeatureCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-purple-100 text-purple-600">
        <Icon name={feature.icon} size={28} />
      </div>
      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  );
};

export default FeatureCard;
